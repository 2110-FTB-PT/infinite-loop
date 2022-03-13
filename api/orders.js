const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserByUsername,
} = require("../db");
// TODO: const { requireAdmin } = require("./utils");

// TODO: require admin
// test result ok
ordersRouter.get("/", async (req, res, next) => {
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

// TODO: require admin
// test result ok
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
// test result ok
ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
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
// test result not ok
ordersRouter.get("/username/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    console.log("username", username);
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
// test result not ok
ordersRouter.get("/status/:status", async (req, res, next) => {
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
// test result not ok
ordersRouter.post("/add", async (req, res, next) => {
  try {
    const { userId, email, address, status } = req.body;
    if (!userId || !email || !address || !status) {
      next({
        name: "OrderMissingFields",
        message: "Please fill in the required field",
      });
    } else {
      const newOrder = await createOrder({
        userId,
        email,
        address,
        status,
      });
      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

// TODO: require user
// test result not ok
ordersRouter.patch("/update/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  console.log("orderId", orderId);
  const { email, address, status } = req.body;
  try {
    const order = await getOrderById(orderId);
    order.map((orderById) => {
      if (orderById.userId !== req.user.id) {
        next({
          name: "UserNotMatching",
          message: "You don't have the right to update this order",
        });
      }
    });
    const updatedOrder = await updateOrder({
      id: orderId,
      email,
      address,
      status,
    });
    res.send(updatedOrder);
    return;
  } catch (error) {
    next(error);
  }
});

// TODO: require user
// test result not ok
ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { email, address, status } = req.body;
  try {
    const order = await getOrderById(orderId);
    order.map((orderById) => {
      if (orderById.userId !== req.user.id) {
        next({
          name: "UserNotMatching",
          message: "You don't have the right to update this order",
        });
      }
    });
    if (order.userId === req.user.id) {
      const updatedOrder = await deleteOrder({
        id: orderId,
        email,
        address,
        status,
      });
      res.send(updatedOrder);
      return;
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
