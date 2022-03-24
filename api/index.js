const express = require('express')
const apiRouter = express.Router();
const { getUserById } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", async (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

const products_ordersRouter = require("./products_orders");
apiRouter.use("/products_orders", products_ordersRouter);

apiRouter.get("*", (req, res, next) => {
  res.status(404).send("not found");
});

module.exports = apiRouter;