const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  setOrderAsPaymentPending,
  setOrderAsProcessing,
  setOrderAsSuccess,
  updateOrder,
  deleteOrder,
  getPendingOrderByUser,
  setOrderAsCanceled
} = require("../db");
const { requireAdmin, requireUser } = require("./utils");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// only admins should be allowed to see all exisitng orders
// removing  requireAdmin for now for testing
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "FetchOrderError",
      message: "Cannot get all orders",
    });
  }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    if (!order) {
      next({
        name: "InvalidOrderId",
        message: "There is no order with that orderId",
      });
      return;
    }
    res.send(order);
  } catch (error) {
    console.error(error);
    next({
      name: "FetchOrderByIdError",
      message: "Cannot get order by id",
    });
  }
});

//any registered users or admins should be able to pull all of their orders
ordersRouter.get("/username/:username", requireUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const _username = req.user.username;
    const isAdmin = req.user.isAdmin;
    if (username === _username || isAdmin) {
      const orders = await getOrdersByUser(username);
      if (!orders) {
        next({
          name: "InvalidOrderId",
          message: "There is no order with that username",
        });
        return;
      }
      res.send(orders);
    } else {
      next({
        name: "InvalidUserError",
        message: "You don't have the permission to view this order",
      });
    }
  } catch (error) {
    console.error(error);
    next({
      name: "FetchOrderByUsernameError",
      message: "Cannot get order by username",
    });
  }
});

ordersRouter.get("/cart/:username", requireUser, async (req, res, next) => {
  const { username } = req.params;
  try {
    const orders = await getPendingOrderByUser(username);
    if (!orders) {
      next({
        name: "NoExistingOrders",
        message: "There are no orders matching username",
      });
    }
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "FetchPendingOrderByUserError",
      message: "Cannot get pending order by username",
    });
  }
});

// only admins should be allowed to see all exisitng orders by status
ordersRouter.get(
  "/status/:status",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { status } = req.params;
    try {
      const orders = await getOrdersByStatus(status);
      if (!orders) {
        next({
          name: "NoExistingOrders",
          message: "There are no orders matching status",
        });
      }
      res.send(orders);
    } catch (error) {
      console.error(error);
      next({
        name: "FetchOrderByStatusError",
        message: "Cannot get order by status",
      });
    }
  }
);

ordersRouter.post("/stripe/session", async (req, res, next) => {
  try {
    const { token, orderId } = req.body;
    const order = await getOrderById(orderId);
    let totalSum = 0;
    for (let i = 0; i < order.products.length; i++) {
      totalSum += order.products.price[i] * order.products.quantity[i];
    }
    const charge = await stripe.charges.create({
      source: token.id,
      currency: "USD",
      amount: totalSum * 100,
    });
    res.json(charge);
  } catch (error) {
    console.error(error);
  }
});

// Create a new order on visit and when there is no existing cart. Create a new order when the order status changes to success.
// Order default status is order_pending.
// endpoint "/cart"
ordersRouter.post("/", async (req, res, next) => {
  try {
    const { first_name, last_name, email, address } = req.body;
    //guest order will have a userId of 1
    if (!req.user) {
      if (!email || !address) {
        const newOrder = await createOrder({
          userId: 1,
          first_name: "",
          last_name: "",
          email: "",
          address: "",
        });
        res.send(newOrder);
      } else {
        const newOrder = await createOrder({
          userId: 1,
          first_name,
          last_name,
          email,
          address,
        });
        res.send(newOrder);
      }
    } else if (req.user) {
      //registered user will have their userId
      const { id } = req.user;
      if (!first_name || !last_name || !email || !address) {
        const newOrder = await createOrder({
          userId: id,
          first_name: "",
          last_name: "",
          email: "",
          address: "",
        });
        res.send(newOrder);
      } else {
        const newOrder = await createOrder({
          userId: id,
          first_name,
          last_name,
          email,
          address,
        });
        res.send(newOrder);
      }
    }
  } catch (error) {
    console.error(error);
    next({
      name: "CreateOrderError",
      message: "Failed to create the order",
    });
  }
});

ordersRouter.post("/payment", async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await getOrderById(orderId);
    console.log("stripe order", order);
    const line_items = order.products.map((product) => {
      return {
        amount: product.price * 100.0,
        name: product.name,
        currency: "usd",
        quantity: product.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/orders/${orderId}/success`,
      cancel_url: `${process.env.SERVER_URL}/orders/${orderId}/cancel`,
    });
    console.log("session url:", { url: session.url });
    res.send({ url: session.url, session });
  } catch (error) {
    console.error;
    next({
      name: "StripeError",
      message: "Failed to process payment with Stripe",
    });
  }
});

// endpoint "/checkout". Order status changes to "payment_pending". During this step, users should fill in their payment method such as billing address, credit card info, etc."
ordersRouter.patch("/checkout", async (req, res, next) => {
  try {
    const { id } = req.body;
    const orderStatus = await setOrderAsPaymentPending(id);
    res.send(orderStatus);
  } catch (error) {
    console.error(error);
    next({
      name: "OrderStatusProcessingError",
      message: "Failed to update the order as processing",
    });
  }
});

// endpoint "/pay" once user confirms pay. Order status changes to "processing."
ordersRouter.patch("/pay", async (req, res, next) => {
  try {
    const { id } = req.body;
    const orderStatus = await setOrderAsProcessing(id);
    res.send(orderStatus);
  } catch (error) {
    console.error(error);
    next({
      name: "OrderStatusSuccessError",
      message: "Failed to update the order as success",
    });
  }
});

ordersRouter.patch("/cancel", requireUser, requireAdmin, async (req, res, next) => {
  const { id } = req.body;
  try {
    const order = await getOrderById(id)

    if (req.user.isAdmin === true || req.user.id === order.id) {
      const orderStatus = await setOrderAsCanceled(id);
      console.log('status ', orderStatus)
      res.send(orderStatus)
    }
  } catch (error) {
    console.error(error);
    next({
      name: "OrderStatusSuccessError",
      message: "Failed to update the order as success",
    });
  }
});

// endpoint "/confirm". Order status changes to "success" once admin manually confirms the order's payment.
ordersRouter.patch(
  "/confirm",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      const orderStatus = await setOrderAsSuccess(id);
      res.send(orderStatus);
    } catch (error) {
      console.error(error);
      next({
        name: "OrderStatusSuccessError",
        message: "Failed to update the order as success",
      });
    }
  }
);

//this request is actually used to create an order with the order form (updating the to processing)
ordersRouter.patch("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const { userId } = await getOrderById(orderId);
    const { first_name, last_name, email, address } = req.body;
    const updatedOrder = await updateOrder({
      id: orderId,
      userId,
      first_name,
      last_name,
      email,
      address,
    });
    res.send(updatedOrder);
  } catch (error) {
    console.error(error);
    next({
      name: "UpdateOrderError",
      message: "Failed to update the order",
    });
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId * 1);
    // check if the cart exists before logging in
    if (userId === 1) {
      const updatedOrder = await deleteOrder(orderId * 1);
      console.log("guest updatedOrder", updatedOrder);
      res.send(updatedOrder);
      return;
    }
    if (id === userId || isAdmin) {
      const updatedOrder = await deleteOrder(orderId);
      res.send(updatedOrder);
    } else {
      next({
        name: "InvalidUserError",
        message:
          "You are not the owner of this account or do not have the permission to update the status",
      });
    }
  } catch (error) {
    console.error(error);
    next({
      name: "deleteOrderError",
      message: "Failed to delete the order",
    });
  }
});

module.exports = ordersRouter;
