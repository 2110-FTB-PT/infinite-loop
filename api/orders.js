const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  setOrderAsProcessing,
  setOrderAsSuccess,
  deleteOrder,
  setOrderAsPaymentPending,
} = require("../db");
const { requireAdmin, requireUser } = require("./utils");

ordersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "fertchOrderError",
      message: "Cannot get all orders",
    });
  }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    console.error(error);
    next({
      name: "NoExistingOrders",
      message: "There are no orders matching orderId",
    });
  }
});

ordersRouter.get(
  "/username/:username",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { username } = req.params;
      const orders = await getOrdersByUser(username);
      res.send(orders);
    } catch (error) {
      console.error(error);
      next({
        name: "NoExistingOrders",
        message: "There are no orders under that username",
      });
    }
  }
);

ordersRouter.get(
  "/status/:status",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { status } = req.params;
    try {
      const orders = await getOrdersByStatus(status);
      res.send(orders);
    } catch (error) {
      console.error(error);
      next({
        name: "orderDoesNotExist",
        message: "There are no orders matching status",
      });
    }
  }
);

// Create a new order on visit and when there is no existing cart. Create a new order when the order status changes to success.
// Order default status is order_pending.
// endpoint "/cart"
ordersRouter.post("/", async (req, res, next) => {
  const { email, address } = req.body;
  try {
    if (!req.user) {
      const newOrder = await createOrder({
        userId: 1,
        email,
        address,
      });
      res.send(newOrder);
    } else if (req.user) {
      const { id } = req.user;
      const newOrder = await createOrder({
        userId: id,
        email,
        address,
      });
      res.send(newOrder);
    }
  } catch (error) {
    console.error(error);
    next({
      name: "CreateOrderError",
      message: "Failed to process the order",
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

// endpoint "/confirm". Order status changes to "success" once admin manually confirms the order's payment.
ordersRouter.patch("/confirm", requireAdmin, async (req, res, next) => {
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

// This is to update any order info such as email and address. This is unrelated to status updates.
ordersRouter.patch("/update/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId);
    if (id === userId || isAdmin) {
      const { email, address } = req.body;
      const updatedOrder = await updateOrder({
        id: orderId,
        userId: userId,
        email,
        address,
      });
      res.send(updatedOrder);
    } else {
      next({
        name: "InvalidUserError",
        message: "You are not the owner of this account",
      });
    }
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
    const { userId } = await getOrderById(orderId);
    if (id === userId || isAdmin) {
      const updatedOrder = await deleteOrder(orderId);
      res.send(updatedOrder);
    } else {
      next({
        name: "InvalidUserError",
        message:
          "You are not the owner of this account or do not have the permission to update the statu",
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
