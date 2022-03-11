// grab our db client connection to use with our adapters
const client = require("../client");

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT * FROM orders;
        `
    );
    return orders;
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
    return order;
  } catch (error) {
    throw error;
  }
};

//get orders by user
const getOrdersByUser = async ({ username }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        `
            SELECT orders.*, users.username AS "creatorName"
            FROM orders
            JOIN users ON orders."creatorId" = users.id
            WHERE username = $1;
        `,
      [username]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const getOrderByStatus = async ({ status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        `
            SELECT * FROM orders
            WHERE status = $1
        `,
      [status]
    );
  } catch (error) {
    throw error;
  }
};

const createOrder = async ({ userId, address, status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        `
            INSERT INTO products ("userId", address, status)
            VALUES ($1, $2, $3);
            RETURNING *;
        `,
      [userId, address, status]
    );
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
            WHERE id =${id}
            RETURNING *;
        `,
      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // add your database adapter fns here
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
};
