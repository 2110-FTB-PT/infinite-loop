const cartRouter = require("express").Router();
const { setOrderAsPending } = require("../db");
const { requireUser } = require("./utils.js");

cartRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  try {
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
