const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserById
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

// TODO: require admin
ordersRouter.get("/username/:username", requireUser, requireAdmin, async (req, res, next) => {
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

ordersRouter.get("/status/:status", requireUser, requireAdmin, async (req, res, next) => {
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
});

ordersRouter.post("/add", requireUser, async (req, res, next) => {
  const { userId, email, address, status } = req.body;
  try {
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
ordersRouter.patch("/update/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id } = req.user;
  const isAdmin = req.user.isAdmin;
  const { email, address, currentStatus } = req.body;
  try {
    const { id: userId } = await getUserById(id);
    if (id === userId || isAdmin){
      const updatedOrder = await updateOrder({
        id: orderId,
        email,
        address,
        currentStatus,
      });
      console.log("updatedorder", updatedOrder);
      res.send(updatedOrder);
      return;
    }
    next({
          name: "InvalidUserError",
          message: "You are not the owner of this account",
        });
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