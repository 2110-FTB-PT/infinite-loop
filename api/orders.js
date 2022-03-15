const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../db");
// TODO: const { requireAdmin } = require("./utils");

// TODO: require admin
ordersRouter.get("/", async (req, res, next) => {
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

// TODO: require admin
ordersRouter.get("/all", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "fetchOrderError",
      message: "Cannot get all orders",
    });
  }
});

// TODO: require user
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

// TODO: require admin
ordersRouter.get("/username/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const orders = await getOrdersByUser(username);
    console.log("orders by username: ", orders);
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "NoExistingOrders",
      message: "There are no orders under that username",
    });
  }
});

// TODO: require admin
ordersRouter.get("/status/:status", async (req, res, next) => {
  try {
    const { status } = req.params;
    const orders = await getOrdersByStatus(status);
    res.send(orders);
  } catch (error) {
    console.error(error);
    next({
      name: "orderDoesNotExist",
      message: "There are no orders matching status",
    });
  }
});

// TODO: require user
ordersRouter.post("/add", async (req, res, next) => {
  try {
    const { userId, email, address, status } = req.body;
    if (!userId || !email || !address || !status) {
      next({
        name: "orderMissingFields",
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
    console.error(error);
    next({
      name: "CreateOrderError",
      message: "Failed to process the order",
    });
  }
});

// TODO: require user and checkOwner OR require admin and checkAdmin
ordersRouter.patch("/update/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  console.log("orderId", orderId);
  const { email, address, currentStatus } = req.body;
  try {
    const updatedOrder = await updateOrder({
      id: orderId,
      email,
      address,
      currentStatus,
    });
    console.log("updatedorder", updatedOrder);
    res.send(updatedOrder);
    return;
  } catch (error) {
    console.error(error);
    next({
      name: "UpdateOrderError",
      message: "Failed to update the order",
    });
  }
});

// to update the status only (to process orders)
ordersRouter.patch("/status/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  console.log("orderId", orderId);
  const { currentStatus } = req.body;
  try {
    const updatedOrder = await updateOrder({
      id: orderId,
      currentStatus,
    });
    res.send(updatedOrder);
    return;
  } catch (error) {
    console.error(error);
    next({
      name: "StatusUpdateError",
      message: "Failed to update the order",
    });
  }
});

// TODO: require user and checkOwner OR require admin and checkAdmin
ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  console.log("orderId", orderId);
  try {
    const updatedOrder = await deleteOrder(orderId);
    res.send(updatedOrder);
    return;
  } catch (error) {
    console.error(error);
    next({
      name: "deleteOrderError",
      message: "Failed to delete the order",
    });
  }
});

module.exports = ordersRouter;