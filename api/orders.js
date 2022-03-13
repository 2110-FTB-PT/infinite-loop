const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../db/models/orders");
// TODO: const { requireAdmin } = require("./utils");

// TODO: require admin
ordersRouter.get("/all", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next({
      name: "CannotFetchOrders",
      message: "Cannot get all orders",
    });
  }
});

// TODO: require user
ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    next({
      name: "OrderDoesNotExist",
      message: "There are no orders matching orderId",
    });
  }
});

// TODO: require admin
ordersRouter.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const orders = await getOrdersByUser(username);
    res.send(orders);
  } catch (error) {
    next({
      name: "OrderDoesNotExist",
      message: "There are no orders matching username",
    });
  }
});

// TODO: require admin
ordersRouter.get("/:status", async (req, res, next) => {
  try {
    const { status } = req.params;
    const orders = await getOrdersByStatus(status);
    res.send(orders);
  } catch (error) {
    next({
      name: "OrderDoesNotExist",
      message: "There are no orders matching status",
    });
  }
});

// TODO: require user
ordersRouter.post("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email, address, status } = req.body;
    const newOrder = await createOrder({
      id: userId,
      email,
      address,
      status,
    });
    res.send(newOrder);
  } catch (error) {
    next({
      name: "OrderDoesNotExist",
      message: "There are no orders matching userId",
    });
  }
});

// TODO: require user
ordersRouter.patch("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { email, address, status } = req.body;
  try {
    const order = await getOrderById(orderId);
    if (order.userId === req.user.id) {
      const updatedOrder = await updateOrder({
        id: orderId,
        email,
        address,
        status,
      });
      res.send(updatedOrder);
      return;
    } else {
      next({
        name: "updateOrderCredentialError",
        message: "You must be the owner of this order to update the order",
      });
    }
  } catch (error) {
    next(error);
  }
});

// TODO: require user
ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { email, address, status } = req.body;
  try {
    const order = await getOrderById(orderId);
    if (order.userId === req.user.id) {
      const updatedOrder = await updateOrder({
        id: orderId,
        email,
        address,
        status,
      });
      res.send(updatedOrder);
      return;
    }
  } catch (error) {
    next({
      name: "deleteOrderCredentialError",
      message: "You must be the owner of this order to delete the order",
    });
  }
});

module.exports = ordersRouter;
