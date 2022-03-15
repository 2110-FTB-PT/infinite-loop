const products_ordersRouter = require("express").Router();
const {
    getProductOrdersById,
    addProductToOrder,
    updateProductOrder,
    getProductsOrdersByOrder,
    deleteProductOrder
} = require("../db");
const { requireUser } = require("./utils")
//insert query requests here//

products_ordersRouter.post("/", requireUser, async (req, res, next) => {
    const { orderId, productId, quantity } = req.body;
    try {
        const newProducts_Order = await addProductToOrder({orderId, productId, quantity});
        res.send(newProducts_Order)
    }   catch (error) {
        console.log("Error at creating a new products order", error)
        next(error);
    }
})

products_ordersRouter.get("/:orderId/products_orders", async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const products_orderByOrder = await getProductsOrdersByOrder({
            id: orderId,
        })
        res.send(products_orderByOrder)
    }   catch (error) {
        console.log("Error at products order by order", error)
        next(error);
    }
})

products_ordersRouter.patch("/:products_orderId", requireUser, async (req, res, next) => {
    const { products_orderId } = req.params;
    const { quantity } = req.body;
    try {
        const products_OrderById = await getProductOrdersById(products_orderId);

        if (products_OrderById.orderId === req.order.id) {
            const updatedProduct_Orders = await updateProductOrder({
                id: products_orderId,
                quantity
            });
            res.send(updatedProduct_Orders);
        } else {
            next ({
                name: "WrongProductOrderCannotUpdate",
                message: "Cannot update the wrong product order"
            })
        }
    }   catch ({name, message}) {
        next({name, message})
    }
})

products_ordersRouter.delete("/:products_orderId", requireUser, async (req, res, next) => {
    const { products_orderId } = req.params;
    try {
        const products_OrderById = await getProductOrdersById(products_orderId);
        
        if (products_OrderById.orderId === req.order.id) {
            const Products_Order = await deleteProductOrder(products_orderId)
            res.send(Products_Order)
        } else {
            next({
                name: "WrongOrderCannotUpdate",
                message: "Cannot delete the wrong product order"
            })
        }
    }   catch ({name, message}) {
        next({name, message})
    }
})

module.exports = products_ordersRouter;
