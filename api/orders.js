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

ordersRouter.post("/checkout", requireUser, async (req, res, next) => {
  const { email, address, status } = req.body;
  const { id } = req.user;
  try {
    if (!email || !address || !status) {
      next({
        name: "orderMissingFields",
        message: "Please fill in the required field",
      });
    } else {
      const newOrder = await createOrder({
        userId: id,
        email,
        address,
        status,
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

ordersRouter.patch("/update/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId);
    if (id === userId || isAdmin) {
      const { email, address, currentStatus } = req.body;
      const updatedOrder = await updateOrder({
        id: orderId,
        userId: userId,
        email,
        address,
        currentStatus,
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

ordersRouter.patch("checkout/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId);
    if (id === userId || isAdmin) {
      const orderProcess = await setOrderAsProcessing(orderId);
      res.send(orderProcess);
    } else {
      next({
        name: "InvalidUserError",
        message:
          "You are not the owner of this account or do not have any rights to update the status",
      });
    }
  } catch (error) {
    console.error(error);
    next({
      name: "OrderStatusProcessingError",
      message: "Failed to update the order as processing",
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
          "You are not the owner of this account or do not have any rights to update the status",
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