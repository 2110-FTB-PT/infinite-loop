// grab our db client connection to use with our adapters
const client = require('../client');

const getAllProducts = async () => {
      /* this adapter should fetch a list of users from your db */
    try {
        const { rows: products } = await client.query(`
            SELECT * FROM products;
        `)

        return products; 
    } catch(error) {
        throw error;
    }
}

const getProductById = async (id) => {
    try {
        const { rows: [product] } = await client.query(`
            SELECT * FROM products
            WHERE id=$1;
        `, [id])

        return product;
    } catch(error) {
        throw error;
    }
}

const getProductByName = async (name) => {
    try {
        const { rows: [product] } = await client.query(`
            SELECT * from products
            WHERE name=$1;
        `, [name])

        return product;
    } catch(error) {
        throw error; 
    }
}
 
const getProductsByCategory = async (category) => {
    try {
        const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE category=$1;
    `, [category])

    return products;
    } catch(error) {
        throw error; 
    }
}

const createProduct = async ({ name, description, category, price, photo }) => {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products (name, description, category, price, photo)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [name, description, category, price, photo]);

        return product;
    } catch(error) {
        throw error; 
    }
}

const updateProduct = async ({ id, ...fields }) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}" = $${index + 1}`).join(', ');

    if (setString.length === 0) {
        return; 
    } 

    try {
        const { rows: [product] } = await client.query(`
            UPDATE products 
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(fields)) 

        return product;
    } catch(error) {
        throw error; 
    } 
}

const deleteProduct = async (id) => {
    try {
        const { rows: [product] } = await client.query(`
            DELETE FROM products
            WHERE id =${id}
            RETURNING *;
        `, [id]);

        return product;
    } catch(error) {
        throw error; 
    }
}

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    getProductById,
    getProductByName, 
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
  };