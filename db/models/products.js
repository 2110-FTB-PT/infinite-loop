const client = require("../client");

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(
      `
            SELECT * FROM products;
        `);

    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * FROM products
            WHERE id = $1;
        `,
      [id]
    );

    return product;
  } catch (error) {
    throw error;
  }
};

const getProductByName = async(name) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * from products
            WHERE LOWER (name)=LOWER($1);
        `,
      [name]
    );
    
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductsByCategory = async (category) => {
  try {
    const {
      rows: products
    } = await client.query(
      `
        SELECT * FROM products
        WHERE LOWER (category)=LOWER($1);
      `,
      [category]
    );

    return products;
  } catch (error) {
    throw error;
  }
};

const createProduct = async ({
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
            WHERE id=$1
            RETURNING id;
        `, [id]);

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};