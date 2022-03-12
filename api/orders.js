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
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const orders = await getAllOrders(username);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
