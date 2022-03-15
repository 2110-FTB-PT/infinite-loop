const client = require('./client');

const {
  createUser,
  createProduct,
  createOrder,
  createReview,
  getUserByUsername,
  getAllReviews, 
  getReviewsByUser
} = require("./models");

const { addProductToOrder } = require("./models/products_orders");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS products_orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      `);
    console.log("Finished dropping tables...");
  } catch (error) {
    throw error;
  }
}

async function createEnums() {
  try {
    console.log('creating enums');
    
    await client.query(`
    DROP TYPE IF EXISTS status; 
    CREATE TYPE status AS ENUM ('pending', 'processing', 'success');
    `);

    console.log('enums created!')
  } catch(error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL, 
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "isActive" BOOLEAN DEFAULT true,
          "isAdmin" BOOLEAN DEFAULT false
        );

        CREATE TABLE products ( 
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(255),
          quantity INTEGER NOT NULL,
          price DECIMAL,
          photo VARCHAR(2048)
        );

        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          email VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          "currentStatus" status
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id) NOT NULL,
          "productId" INTEGER REFERENCES products(id) NOT NULL,
          description TEXT NOT NULL,
          rating INTEGER NOT NULL,
          UNIQUE ("userId", "productId")
        );

        CREATE TABLE products_orders (
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES orders(id) NOT NULL,
          "productId" INTEGER REFERENCES products(id) NOT NULL,
          quantity INTEGER NOT NULL,
          UNIQUE ("productId", "orderId")
        );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

const createInitialUsers = async () => {
  try {
    console.log('trying to create initial users')

    const usersToCreate = [
      {
        full_name: "Guest Guest", email: "guest@plantarrium.com", username: "guest", password: "guestguest", isActive: true, isAdmin: false
      },
      { full_name: "albert smith", email: "albert@plantarrium.com", username: "albert", password: "bertie9999", isActive: true, isAdmin: false },
      { full_name: "Lindsay Naki", email: "lindsay@plantarrium.com", username: "lindsay", password: "lindsaylindsay", isActive: true, isAdmin: true },
      { full_name: "Yeonju Park", email: "yeonju@plantarrium.com", username: "yeonju", password: "yeonjuyeonju", isActive: true, isAdmin: true },
      { full_name: "Kim Le", email: "kim@plantarrium.com", username: "kim", password: "kimkimkimk", isActive: true, isAdmin: true },
      { full_name: "Mark Angelo Dabu", email: "mark@plantarrium.com", username: "mark", password: "markmarkma", isActive: true, isAdmin: true },
    ]

    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('finished creating initial users');
    console.log('initial users created: ', users);

    return users;
  } catch (error) {
    throw error;
  }
}

const createInitialProducts = async () => {

  try {
    console.log('trying to create initial products')

    const productsToCreate = [
      {
        name: "ZZ Plant",
        description: "With shiny and thick layered leaves, this tabletop version of the hardy ZZ Plant is perfect as an accent on a coffee table or bookshelf.",
        category: "Large Plant",
        quantity: 1,
        price: 69,
        photo: "https://bloomscape.com/wp-content/uploads/2021/07/bloomscape_zz-plant_md_indigo-e1627332695334.jpeg?ver=559480"
      },
      {
        name: "Bird of Paradise",
        description: "Impressive and tropical with large, glossy leaves that naturally split over time.",
        category: "Large",
        quantity: 1,
        price: 199,
        photo: "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bird-of-paradise_indigo.jpg?ver=279491"
      }
    ]

    const products = await Promise.all(productsToCreate.map(product => createProduct(product)));

    console.log('success creating initial products!');
    console.log('products created: ', products);

    return products;
  } catch (error) {
    console.error('error creating initial products')
    throw error;
  }
}

const createInitialOrders = async () => {
  try {
    console.log('trying to create initial orders...')

    const ordersToCreate = [
      { userId: 1, email: "albert@plantarrium.com", address: "1234 Fullstack St", status: "success" },
      { userId: 2, email: "lindsay@plantarrium.com", address: "1234 Main St", status: "success" }
    ]
    const orders = await Promise.all(ordersToCreate.map(order => createOrder(order)))

    console.log('success creating initial orders!');
    console.log('orders created: ', orders)

    return orders;
  } catch (error) {
    console.error(error)
  }
}

const createInitialReviews = async () => {

  try {
    console.log('trying to create initial reviews...')

    const reviewsToCreate = [
      { userId: 1, productId: 1, description: "Amazing!", rating: 5 },
      { userId: 2, productId: 1, description: "Love it!", rating: 4 }
    ]

    const reviews = await Promise.all(reviewsToCreate.map(review => createReview(review)));

    console.log('success creating initial reviews!');
    console.log('reviews created: ', reviews);

    return reviews;
  } catch (error) {
    console.error('error creating initial reviews')
  }
}

const createInitialProductsOrders = async () => {
  try {
    console.log('trying to create initial products orders...')

    const productsOrdersToCreate = [
      {
        orderId: 1,
        productId: 2,
        quantity: 1
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 2
      }
    ]

    const orderProducts = await Promise.all(productsOrdersToCreate.map(addProductToOrder));

    console.log('products_orders created: ', orderProducts)
    console.log('Finished creating products_orders!')
  } catch (error) {
    console.error('error creating initial products orders')
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createEnums();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialOrders();
    await createInitialReviews();
    await createInitialProductsOrders();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
