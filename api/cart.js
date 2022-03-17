const cartRouter = require("express").Router();
const { setOrderAsPending, getOrderById } = require("../db");
const { requireUser } = require("./utils.js");

cartRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId);
    if (id === userId || isAdmin) {
      const cartStatus = await setOrderAsPending(orderId);
      res.send(cartStatus);
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
      name: "CartStatusUpdateError",
      message: "Failed to update the order as pending",
    });
  }
});

module.exports = cartRouter;