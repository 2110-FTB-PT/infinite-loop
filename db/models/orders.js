// grab our db client connection to use with our adapters
const client = require("../client");

const addProductsToOrders = async (orders) => {
  try {
    if (!orders) {
      throw {
        name: "OrdersNotFound",
        message: "No orders found!",
      };
    }

    const orderIdArray = orders.map((order) => {
      return order.id;
    });
    const { rows: products } = await client.query(`
          SELECT products.*, products_orders.quantity, products_orders."orderId", products_orders.id AS "productOrderId" 
          FROM products
          JOIN products_orders 
          ON products_orders."productId"=products.id
          WHERE products_orders."orderId" IN (${orderIdArray});
      `);

    orders.forEach((order) => {
      order.products = products.filter((product) => {
        return product.orderId === order.id;
      });
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT * FROM orders;
        `
    );

    return await addProductsToOrders(orders);
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT * FROM orders
            WHERE id = $1;
        `,
      [id]
    );

    return await addProductsToOrders([order]);
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async (username) => {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT orders.*, users.username, users.id
            FROM orders
            JOIN users ON orders."userId" = users.id
            WHERE username = $1;
        `,
      [username]
    );
    return await addProductsToOrders(orders);
  } catch (error) {
    throw error;
  }
};

const getOrdersByStatus = async (status) => {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT * FROM orders
            WHERE "currentStatus" = $1
        `,
      [status]
    );
    return await addProductsToOrders(orders);
  } catch (error) {
    throw error;
  }
};

const createOrder = async ({ userId, email, address, status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders ("userId", email, address, "currentStatus")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [userId, email, address, status]
    );
    console.log("created order", order);
    return order;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [order],
    } = await client.query(
      `
            UPDATE orders 
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `,
      Object.values(fields)
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        ` 
            DELETE FROM orders
            WHERE id = $1
            RETURNING id;
        `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
};
