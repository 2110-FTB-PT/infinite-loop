const {
  client,
  createUser,
  createProduct,
  createOrder,
  createReview
} = require('./');

const { rebuildDB } = require('./seedData')

const buildTables = async () => {
  try {
    client.connect();
    await rebuildDB();
  } catch (error) {
    throw error;
  }
}

const createInitialUsers = async () => {
  try {
    console.log('trying to create initial users')

    const usersToCreate = [
      {username: "albert", email: "albert@plantarrium.com", password: "bertie99", isAdmin: false},
      {username: "lindsay", email: "lindsay@plantarrium.com", password: "lindsay", isAdmin: true}
    ]

    const users = await Promise.all(usersToCreate.map(user => createUser(user)));

    console.log('finished creating initial users');
    console.log('initial users created: ', users);

    return users;
  } catch (error) {
    throw error;
  }
}

const createInitialProducts = async () => {

  try{
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
  } catch(error) {
    console.error('error creating initial products')
    throw error;
  }
}

const createInitialOrders = async () => {
  try{
    console.log('trying to create initial orders...')

    const ordersToCreate = [
      { userId: 1, address: "1234 Fullstack St" },
      { userId: 2, address: "1234 Main St" }
    ]
    const orders = await Promise.all(ordersToCreate.map(order => createOrder(order)))

    console.log('success creating initial orders!');
    console.log('orders created: ', orders)

    return orders;
  } catch(error) {
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
  } catch(error) {
    console.error('error creating initial reviews')
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitialProducts)
  .then(createInitialReviews)
  .then(createInitialOrders)
  .catch(console.error)
  .finally(() => client.end());
