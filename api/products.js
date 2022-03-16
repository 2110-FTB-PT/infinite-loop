const express = require('express')
const productsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils.js')
const { getAllProducts, getProductById, getProductByName, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require("../db")

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/:name', async (req, res, next) => {
    const { name }  = req.params;
    console.log('name: ', name)

    try {
        const product = await getProductByName(name);

        console.log('product by name: ', product)
        res.send(product)
    } catch (error) {
        next(error)
    }
})

productsRouter.get('/categories/:category', async (req, res, next) => {
    const { category } = req.params;

    try {
        const products = await getProductsByCategory(category);

        console.log('product by name: ', products)
        res.send(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/addproduct', requireUser, requireAdmin, async (req, res, next) => {
    const { name, description, category, quantity, price, photo } = req.body
    try {
        const addedProduct = await createProduct({ name, description, category, quantity, price, photo })

        console.log('new product added: ', addedProduct)
        res.send(addedProduct)
    } catch (error) {
        next(error)
    }
})

productsRouter.patch("/:productId", requireUser, requireAdmin, async (req, res, next) => {
    const { productId } = req.params
    const { id, name, description, category, quantity, price, photo } = req.body

    try {
        const updatedProduct = await updateProduct({ id: productId, name, description, category, quantity, price, photo });

        console.log('updated product: ', updatedProduct)
        res.send(updatedProduct);
    } catch (error) {
        next(
            error
        );
    }
});

productsRouter.delete("/:productId", requireUser, requireAdmin, async (req, res, next) => {
    const id = req.params.productId
    console.log('req params id: ', id)
    try {
        const deletedProduct = await deleteProduct(id)
        console.log('deleted product: ', deletedProduct)
        res.send(deletedProduct)
    } catch (error) {
        next(error)
    }
})

module.exports = productsRouter;