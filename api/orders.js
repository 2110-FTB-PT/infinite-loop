const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
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

ordersRouter.post("/add", requireUser, async (req, res, next) => {
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

// TODO: require user and checkOwner OR require admin and checkAdmin
ordersRouter.patch("/update/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id } = req.user;
  const isAdmin = req.user.isAdmin;
  try {
    const {orderId} = await getOrderById(orderId);
    console.log("orderbyid", orderById);
    const { email, address, currentStatus } = req.body;
    console.log("id, userId", id, orderUserId);
    if (id === orderUserId || isAdmin) {
      const updatedOrder = await updateOrder({
        id: orderId,
        userId: userId,
        email,
        address,
        currentStatus,
      });
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
// this needs to be entirely changed using setOrderAsPending, setOrderAsProcessing, setOrderAsSuccess
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

// TODO: require user and checkOwner 
ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
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