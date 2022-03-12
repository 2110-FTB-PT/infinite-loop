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
//requireuser from utils

//require admin
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders({});
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

ordersRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
module.exports = ordersRouter;
