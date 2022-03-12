const ordersRouter = require("express").Router();
//insert query requests here//

const {
  addProductsToOrders,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../db/orders");
module.exports = ordersRouter;
