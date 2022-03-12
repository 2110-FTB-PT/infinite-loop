// grab our db client connection to use with our adapters
const client = require("../client");

const addProductsToOrders = async (orders) => {
  try {
<<<<<<< HEAD
      const orderIdArray = orders.map((order) => {
          return order.id
      })
      const { rows: products_orders } = await client.query(`
          SELECT products FROM products
          JOIN products_orders ON products_orders."productId"=products.id
          WHERE products_orders."orderId" IN (${orderIdArray});
      `)

      orders.forEach((order) => {
        order.products = products.filter((product) => {
          return product.orderId === order.id
        })
      })

      return orders;
  } catch(error) {
      throw error;
  }
}
// adding products to each order
// first find each order id 
// select all products from products table on the condition that the product id is equal to the "productId" from the products_orders
// on another condition in which the orderid from products_tables is also in the order id 
// after grabbing those products that are in the specified order id, we add those products to the individual order object 
=======
    const orderIdArray = orders.map((order) => {
      return order.id;
    });
    const { rows: products_orders } = await client.query(`
          SELECT products FROM products
          JOIN products_orders ON products_orders."productId"=products.id
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
// adding products to each order
// first find each order id
// select all products from products table on the condition that the product id is equal to the "productId" from the products_orders
// on another condition in which the orderid from products_tables is also in the order id
// after grabbing those products that are in the specified order id, we add those products to the individual order object
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
// we map through each of ther orders and add the products as a key value pair to each order on the condition that the order.id is equal to product.orderid which comes from the joining of tables

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
    return await addProductsToOrders(order);
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async ({ username }) => {
  try {
<<<<<<< HEAD
    const {
      rows: orders,
    } = await client.query(
=======
    const { rows: orders } = await client.query(
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
      `
            SELECT orders.*, users.username AS "customerName"
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

const getOrdersByStatus = async ({ status }) => {
  try {
<<<<<<< HEAD
    const {
      rows: orders,
    } = await client.query(
=======
    const { rows: orders } = await client.query(
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
      `
            SELECT * FROM orders
            WHERE status = $1
        `,
      [status]
    );
    return await addProductsToOrders(orders);
  } catch (error) {
    throw error;
  }
};

<<<<<<< HEAD
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
=======
const createOrder = async ({ userId, email, address, status }) => {
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
  try {
    const {
      rows: [order],
    } = await client.query(
        `
<<<<<<< HEAD
            INSERT INTO products (fullName, address, status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [fullName, address, status]
=======
            INSERT INTO products (userId, email, address, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [userId, email, address, status]
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
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
  getOrdersByUser,
  getOrdersByStatus,
<<<<<<< HEAD
  createUserOrder,
  createGuestOrder,
=======
  createOrder,
>>>>>>> bcf4d0d2b8a47817e4fab0adca6f628d122a6069
  updateOrder,
  deleteOrder,
};
