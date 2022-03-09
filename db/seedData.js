// const {

//   } = require("./");
//   const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS users;
      `);
    console.log("Finished dropping tables...");
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables, in the correct order

    await client.query(`
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE admins(
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "itemId" INTEGER REFERENCES products(id) NOT NULL,
          "reviewerId" INTEGER REFERENCES users(id) NOT NULL,
          description TEXT NOT NULL
        );

        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id) NOT NULL,
          "productId" INTEGER REFERENCES products(id) NOT NULL,
          quantity INTEGER,
          total INTEGER
        );

        CREATE TABLE products ( 
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL
        );
      `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
