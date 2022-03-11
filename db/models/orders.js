// grab our db client connection to use with our adapters
const client = require("../client");

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(`
            SELECT * FROM orders;
        `);
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
            SELECT * FROM orders;
            WHERE id=$1;
        `,
      [id]
    );
    return order;
  } catch (error) {
    throw error;
  }
};

//get orders by user
const getOrdersByUserId = async ({ username }) => {
  try {
    const { rows: orders } = await client.query(
      `
            SELECT * FROM orders;
            WHERE id=$1;
        `,
      [username]
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

//create orders
const createOrder = async ({
  name,
  description,
  category,
  quantity,
  price,
  photo,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (name, description, category, quantity, price, photo)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      [name, description, category, quantity, price, photo]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products 
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            DELETE FROM products
            WHERE id =${id}
            RETURNING *;
        `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // add your database adapter fns here
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
