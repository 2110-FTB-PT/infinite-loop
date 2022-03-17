const cartRouter = require("express").Router();
const { setOrderAsPending, getOrderById } = require("../db");
const { requireUser } = require("./utils.js");

cartRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { id, isAdmin } = req.user;
  try {
    const { userId } = await getOrderById(orderId);
    console.log("isAdmin", isAdmin)
    if (id !== userId || !isAdmin ) {
        next({
            name: "InvalidUserError",
            message: "You are not the owner of this account or do not have any rights to update the status",
          });
    }
    const cartStatus = await setOrderAsPending(orderId);
    res.send(cartStatus);
  } catch (error) {
    console.error(error);
    next({
      name: "CartStatusUpdateError",
      message: "This order status is not getting updated for cart",
    });
  }
});

module.exports = cartRouter;
