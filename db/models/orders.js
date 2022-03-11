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

const getOrderByUser = async ({ username }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT orders.*, users.username AS "customerName"
            FROM orders
            JOIN users ON orders."userId" = users.id
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
    return order;
  } catch (error) {
    throw error;
  }
};

const createUserOrder = async ({ userId, fullName, address, status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        `
            INSERT INTO products (userId, fullName, address, status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [userId, fullName, address, status]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

const createGuestOrder = async ({ fullName, address, status }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
        `
            INSERT INTO products (fullName, address, status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [fullName, address, status]
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
  getAllOrders,
  getOrderById,
  getOrderByUser,
  getOrderByStatus,
  createUserOrder,
  createGuestOrder,
  updateOrder,
  deleteOrder,
};
