// This is the Web Server
const express = require("express");
const server = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require("cors");
server.use(cors());

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
server.use(express.json());

// // here's our static files
const path = require("path");
// server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use("/api", require("./api"));

// bring in the DB connection
const { client, getProductById, getOrderById } = require("./db");

server.get("*", (req, res, next) => {
  res.status(404).send("not found");
});

server.use(({ name, message }, req, res, next) => {
  res.status(500).send({
    name,
    message,
  });
});

server.post("/api/orders/checkout", async (req, res, next) => {
  // get the individual products you need in here
  try {
    const order = await getOrderById(1);
    console.log("order", order);
    //grab the orderId from frontend
    //getOrderbyId using that orderId
    //go through the products within the order and make the line items with those products
    const line_items = order.products.map((product) => {
      return {
        amount: product.price*100.00,
        name: product.name,
        currency: "usd",
        quantity: product.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    console.log("session url:", { url: session.url });
    res.send({ url: session.url });
  } catch (error) {
    console.error(error);
  }
});

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // if server is running in github actions context skip db connection
  if (!process.env.CI) {
    try {
      await client.connect();
      console.log("Database is open for business!");
    } catch (error) {
      console.error("Database is closed for repairs!\n", error);
    }
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
