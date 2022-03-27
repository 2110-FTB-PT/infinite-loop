const client = require("./client");

const {
  createUser,
  createProduct,
  createOrder,
  createReview,
  updateAdminUser,
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
    console.log("creating enums");

    await client.query(`
    DROP TYPE IF EXISTS status; 
    CREATE TYPE status AS ENUM ('canceled', 'order_pending', 'payment_pending', 'processing', 'success');
    `);

    console.log("enums created!");
  } catch (error) {
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
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          "currentStatus" status DEFAULT 'order_pending'
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
    console.log("trying to create initial users");

    const guestUser = await createUser({
      full_name: "Guest Guest",
      email: "guest@plantarrium.com",
      username: "guest",
      password: "guestguest",
      isActive: true,
      isAdmin: false,
    });

    const albertUser = await createUser({
      full_name: "albert smith",
      email: "albert@plantarrium.com",
      username: "albert",
      password: "bertie9999",
      isActive: true,
      isAdmin: false,
    });

    const lindsayUser = await createUser({
      full_name: "Lindsay Naki",
      email: "lindsay@plantarrium.com",
      username: "lindsay",
      password: "lindsaylindsay",
      isActive: true,
      isAdmin: true,
    });

    const yeonjuUser = await createUser({
      full_name: "Yeonju Park",
      email: "yeonju@plantarrium.com",
      username: "yeonju",
      password: "yeonjuyeonju",
      isActive: true,
      isAdmin: true,
    });

    const kimUser = await createUser({
      full_name: "Kim Le",
      email: "kim@plantarrium.com",
      username: "kim",
      password: "kimkimkimk",
      isActive: true,
      isAdmin: true,
    });

    const markUser = await createUser({
      full_name: "Mark Angelo Dabu",
      email: "mark@plantarrium.com",
      username: "mark",
      password: "markmarkma",
      isActive: true,
      isAdmin: true,
    });

    const users = [
      guestUser,
      albertUser,
      lindsayUser,
      yeonjuUser,
      kimUser,
      markUser,
    ];

    console.log("finished creating initial users");
    console.log("initial users created: ", users);

    return users;
  } catch (error) {
    throw error;
  }
};

const createInitialProducts = async () => {
  try {
    console.log("trying to create initial products");

    const productOne = await createProduct({
      name: "English Ivy",
      description:
        "The English Ivy ‘Glacier’ is a gorgeous trailing plant for any space. The colors range from icy greens and blues to a creamy leaf edge. This plant will grow quickly in indirect bright light but can also handle low light. This ivy will mature beautifully in a hanging pot, and appreciates a little extra humidity, so mist often.",
      category: "SmallPlants",
      quantity: 100,
      price: 39,
      photo:
        "https://bloomscape.com/wp-content/uploads/2021/12/Bloomscape_IvyGlacier_small_slate-scaled.jpg?ver=639583",
    });

    const productTwo = await createProduct({
      name: "Jade Plant",
      description:
        "Jade Plants are one of the most beloved succulents. This easy to care for, long-lasting plant can be passed down for generations, becoming your own family heirloom. Keep in indirect to bright light and water only when the soil is completely dry. Keep this plant’s round leaves pest-free by dusting regularly.",
      category: "SmallPlants",
      quantity: 100,
      price: 39,
      photo:
        "https://bloomscape.com/wp-content/uploads/2021/12/Bloomscape_Jade_small_charcoal-scaled.jpg?ver=639577",
    });

    const productThree = await createProduct({
      name: "Prickly Pear Cactus",
      description:
        "A playful cactus with pads shaped like a beavertail, the Prickly Pear Cactus is a low-maintenance plant with a no-fuss care routine with infrequent watering and fertilizing.",
      category: "MediumPlants",
      quantity: 100,
      price: 69,
      photo:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_prickly-pear-cactus_stone_alt.jpg?ver=279310",
    });

    const productFour = await createProduct({
      name: "Kangaroo Fern",
      description:
        "This lively and pet-friendly fern has unique deep green fronds. The Kangaroo Fern grows long fuzzy roots known as rhizomes; when in its natural habitat, this plant uses these roots to spread across the forest floor. Mist your fern often to mimic its natural humid environment.",
      category: "MediumPlants",
      quantity: 100,
      price: 79,
      photo:
        "https://bloomscape.com/wp-content/uploads/2021/12/Bloomscape_KangarooFern_medium_Charcoal-scaled.jpg?ver=639598",
    });

    const productFive = await createProduct({
      name: "ZZ Plant",
      description:
        "With shiny and thick layered leaves, this tabletop version of the hardy ZZ Plant is perfect as an accent on a coffee table or bookshelf.",
      category: "LargePlants",
      quantity: 1,
      price: 69,
      photo:
        "https://bloomscape.com/wp-content/uploads/2021/07/bloomscape_zz-plant_md_indigo-e1627332695334.jpeg?ver=559480",
    });

    const productSix = await createProduct({
      name: "Bird of Paradise",
      description:
        "Impressive and tropical with large, glossy leaves that naturally split over time.",
      category: "LargePlants",
      quantity: 1,
      price: 199,
      photo:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bird-of-paradise_indigo.jpg?ver=279491",
    });

    const products = [
      productOne,
      productTwo,
      productThree,
      productFour,
      productFive,
      productSix,
    ];
    console.log("success creating initial products!");
    console.log("products created: ", products);

    return products;
  } catch (error) {
    console.error("error creating initial products");
    throw error;
  }
};

const createInitialOrders = async () => {
  try {
    console.log("trying to create initial orders...");

    const orderOne = await createOrder({
      userId: 1,
      first_name: "Ryan Riley",
      last_name: "Puzon",
      email: "guest@plantarrium.com",
      address: "1234 Fullstack St",
      status: "success",
    });
    const orderTwo = await createOrder({
      userId: 2,
      first_name: "Albert",
      last_name: "Smith",
      email: "albert@plantarrium.com",
      address: "1234 Main St",
      status: "success",
    });
    const orderThree = await createOrder({
      userId: 3,
      first_name: "Lindsay",
      last_name: "Naki",
      email: "lindsay@plantarrium.com",
      address: "1234 Mid St",
      status: "success",
    });

    const orders = [orderOne, orderTwo, orderThree];

    console.log("success creating initial orders!");
    console.log("orders created: ", orders);

    return orders;
  } catch (error) {
    console.error(error);
  }
};

const createInitialReviews = async () => {
  try {
    console.log("trying to create initial reviews...");

    const reviewOne = await createReview({
      userId: 1,
      productId: 1,
      description: "Amazing!",
      rating: 5,
    });
    const reviewTwo = await createReview({
      userId: 2,
      productId: 1,
      description: "Love it!",
      rating: 4,
    });
    const reviewThree = await createReview({
      userId: 3,
      productId: 5,
      description: "way too expensive, took forever to ship",
      rating: 1,
    });
    const reviewFour = await createReview({
      userId: 3,
      productId: 6,
      description: "testing delete",
      rating: 2,
    });

    const reviews = [reviewOne, reviewTwo, reviewThree, reviewFour];

    console.log("success creating initial reviews!");
    console.log("reviews created: ", reviews);

    return reviews;
  } catch (error) {
    console.error("error creating initial reviews");
  }
};

const createInitialProductsOrders = async () => {
  try {
    console.log("trying to create initial products orders...");

    const productOrderOne = await addProductToOrder({
      orderId: 1,
      productId: 2,
      quantity: 1,
    });
    const productOrderTwo = await addProductToOrder({
      orderId: 2,
      productId: 1,
      quantity: 2,
    });
    const productOrderThree = await addProductToOrder({
      orderId: 3,
      productId: 4,
      quantity: 1,
    });

    const productOrders = [productOrderOne, productOrderTwo, productOrderThree];

    console.log("products_orders created: ", productOrders);
    console.log("Finished creating products_orders!");

    return productOrders;
  } catch (error) {
    console.error("error creating initial products orders");
  }
};

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
    await updateAdminUser(3);
    await updateAdminUser(4);
    await updateAdminUser(5);
    await updateAdminUser(6);
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
