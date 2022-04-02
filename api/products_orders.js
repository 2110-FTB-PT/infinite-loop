const products_ordersRouter = require("express").Router();
const {
  addProductToOrder,
  updateProductOrder,
  getProductsOrdersByOrder,
  deleteProductOrder,
} = require("../db");

products_ordersRouter.get("/order/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const products_orderByOrder = await getProductsOrdersByOrder({
      id: orderId,
    });
    res.send(products_orderByOrder);
  } catch (error) {
    console.error(error);
    next({
      name: "matchingOrderIdError",
      message: "there is no products orders matching this orderId",
    });
  }
});

products_ordersRouter.post("/", async (req, res, next) => {
  const { orderId, productId, quantity } = req.body;
  if (!orderId || !productId || !quantity) {
    next({
      name: "missingRequiredFields",
      message: "missing orderId, productId, or quantity",
    });
  }
  try {
    const newProducts_Order = await addProductToOrder({
      orderId,
      productId,
      quantity,
    });
    res.send(newProducts_Order);
  } catch (error) {
    console.error(error);
    next({
      name: "failedAddingProductsOrder",
      message: "products_orders were not added successfully",
    });
  }
});

products_ordersRouter.patch("/:products_orderId", async (req, res, next) => {
  const { products_orderId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedProductOrders = await updateProductOrder({
      id: products_orderId,
      quantity,
    });
    res.send(updatedProductOrders);
  } catch (error) {
    console.error(error);
    next({
      name: "failedProductsOrdersUpdate",
      message: "Failed to update products_orders",
    });
  }
});

products_ordersRouter.delete("/:products_orderId", async (req, res, next) => {
  const { products_orderId } = req.params;
  try {
    const products_order = await deleteProductOrder(products_orderId);
    res.send(products_order);
  } catch (error) {
    console.error(error);
    next({
      name: "failedProductsOrdersUpdate",
      message: "Failed to update products_orders",
    });
  }
});

module.exports = products_ordersRouter;