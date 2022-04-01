const express = require("express");
const productsRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils.js");
const {
  getAllProducts,
  getProductByName,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    if (!products) {
      next({
        name: "NoProductsFound",
        message: "There are no products available.",
      });
      return;
    }

    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:name", async (req, res, next) => {
  const { name } = req.params;

  try {
    const product = await getProductByName(name);

    if (!product) {
      next({
        name: "InvalidProductName",
        message: "There are no products by that name available.",
      });
      return;
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/productid/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);

    if (!product) {
      next({
        name: "InvalidProductId",
        message: "There are no products by that productId available.",
      });
      return;
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/categories/:category", async (req, res, next) => {
  const { category } = req.params;

  try {
    const products = await getProductsByCategory(category);

    if (!products) {
      next({
        name: "InvalidCategory",
        message: "There are no available products in this category.",
      });
      return;
    }

    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post(
  "/add",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { name, description, category, quantity, price, photo } = req.body;
    try {
      const addedProduct = await createProduct({
        name,
        description,
        category,
        quantity,
        price,
        photo,
      });

      if (!name || !description || !category || !quantity || !price || !photo) {
        next({
          name: "MissingField",
          message: "All fields are required.",
        });
      }

      res.send(addedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.patch(
  "/:productId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { productId } = req.params;
    const { id, name, description, category, quantity, price, photo } =
      req.body;

    try {
      const product = await getProductById(productId);

      if (!product) {
        next({
          name: "InvalidProduct",
          message: "Product does not exist.",
        });
        return;
      }

      const updatedProduct = await updateProduct({
        id: productId,
        name,
        description,
        category,
        quantity,
        price,
        photo,
      });

      if (!name || !description || !category || !quantity || !price || !photo) {
        next({
          name: "MissingField",
          message: "All fields are required.",
        });
      }

      res.send(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.patch("/stock/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { deductedQuantity } = req.body;

  try {
    const product = await getProductById(productId);

    if (!product) {
      next({
        name: "InvalidProduct",
        message: "Product does not exist.",
      });
      return;
    }

    const updatedProduct = await updateProduct({
      id: productId,
      quantity: product.quantity - deductedQuantity,
    });

    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete(
  "/:productId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const id = req.params.productId;

    try {
      const deletedProduct = await deleteProduct(id);

      if (!deletedProduct) {
        next({
          name: "InvalidProduct",
          message: "Error deleting this order!",
        });
      }

      res.send(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productsRouter;
