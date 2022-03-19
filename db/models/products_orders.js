const client = require("../client");

const getProductOrdersById = async (id) => {
  try {
    const {
      rows: [product_order],
    } = await client.query(
      `
            SELECT * FROM products_orders
            WHERE id = $1
        `,
      [id]
    );

    return product_order;
  } catch (error) {
    throw error;
  }
};

const addProductToOrder = async ({ orderId, productId, quantity }) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO products_orders ("orderId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *; 
        `,
      [orderId, productId, quantity]
    );

    return order;
  } catch (error) {
    throw error;
  }
};

const updateProductOrder = async ({ id, ...orderFields }) => {
  const setString = Object.keys(orderFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join("");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product_order],
    } = await client.query(
      `
            UPDATE products_orders 
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `,
      Object.values(orderFields)
    );

    return product_order;
  } catch (error) {
    throw error;
  }
};

const getProductsOrdersByOrder = async ({ id }) => {
  try {
    const { rows: product_order } = await client.query(
      `
            SELECT * FROM products_orders
            WHERE "orderId" = $1;
        `,
      [id]
    );
    
    return product_order;
  } catch (error) {
    throw error;
  }
};

const deleteProductOrder = async (id) => {
  try {
    const {
      rows: [product_order],
    } = await client.query(
      `
            DELETE FROM products_orders
            WHERE id = $1
            RETURNING id;
        `,
      [id]
    );

    return product_order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductOrdersById,
  addProductToOrder,
  updateProductOrder,
  getProductsOrdersByOrder,
  deleteProductOrder,
};