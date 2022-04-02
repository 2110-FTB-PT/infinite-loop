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
  setOrderAsCanceled,
  setOrderAsOrderPending,
} = require("../db");
const { requireAdmin, requireUser } = require("./utils");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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

ordersRouter.patch(
  "/cancel",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { id } = req.body;
    try {
      const order = await getOrderById(id);

      if (req.user.isAdmin === true || req.user.id === order.id) {
        const orderStatus = await setOrderAsCanceled(id);
        res.send(orderStatus);
      }
    } catch (error) {
      console.error(error);
      next({
        name: "OrderStatusSuccessError",
        message: "Failed to update the order as success",
      });
    }
  }
);

ordersRouter.patch("/confirm", async (req, res, next) => {
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
});

ordersRouter.patch("/order_pending", async (req, res, next) => {
  try {
    const { id } = req.body;
    const orderStatus = await setOrderAsOrderPending(id);
    res.send(orderStatus);
  } catch (error) {
    console.error(error);
    next({
      name: "OrderStatusSuccessError",
      message: "Failed to update the order as order_pending",
    });
  }
});

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

ordersRouter.patch("/userId/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { userId } = req.body;
  try {
    const updatedOrder = await updateOrder({
      id: orderId,
      userId,
    });
    res.send(updatedOrder);
  } catch (error) {
    console.error(error);
    next({
      name: "UpdateOrderUserIdError",
      message: "Failed to update the order's userId",
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

ordersRouter.post("/create-payment-intents", async (req, res, next) => {
  const { products } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateTotal(products),
    currency: "USD",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const calculateTotal = (products) => {
  let totalSum = 0;
  for (let i = 0; i < products.length; i++) {
    totalSum += products[i].price * 1 * products[i].quantity * 1;
  }
  if (totalSum < 10) {
    totalSum += 5;
  } else if (totalSum >= 10 && totalSum <= 100) {
    totalSum += 10;
  } else if (totalSum > 100) {
    totalSum += 25;
  }
  return totalSum * 100;
};

module.exports = ordersRouter;