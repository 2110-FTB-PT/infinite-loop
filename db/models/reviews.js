const client = require("../client");

// add product info to reviews
const addProductsAndUserToReview = async (reviews) => {
  const reviewIdArray = reviews.map((review) => {
    return review.id;
  })

  const { rows: products } = await client.query(`
    SELECT products.*, reviews."productId", reviews.description, reviews.rating, reviews.id AS "reviewId"
    FROM reviews
    JOIN products
    ON products.id = reviews."productId"
    WHERE reviews.id IN (${reviewIdArray});
  `)

  const { rows: users } = await client.query(`
    SELECT users.*, reviews."productId", reviews.description, reviews.rating, reviews.id AS "reviewId"
    FROM reviews
    JOIN users
    ON users.id = reviews."userId"
    WHERE reviews.id IN (${reviewIdArray});
  `)

  reviews.forEach((review) => {
    review.products = products.filter((product) => {
      return product.reviewId === review.id
    })

    review.users = users.filter((user) => {
      return user.reviewId ===review.id
    })
  })

  return reviews;
}

//get all reviews
const getAllReviews = async () => {
  try {
    const { rows: reviews } = await client.query(`
           SELECT * FROM reviews;
        `);
        
    return await addProductsAndUserToReview(reviews); 
  } catch (error) {
    throw error;
  }
};

//get reviews by id
const getReviewById = async (id) => {
  try {
    const {
      rows: review,
    } = await client.query(
      `
            SELECT * FROM reviews
            WHERE id=$1;
        `,
      [id]
    );
    return await addProductsAndUserToReview(review); 
  } catch (error) {
    throw error;
  }
};

//get reviews by user
const getReviewsByUser = async (username) => {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT reviews.*, users.username, users.id
            FROM reviews
            JOIN users ON reviews."userId" = users.id
            WHERE username = $1;
        `,
      [username]
    );

    return await addProductsAndUserToReview(reviews); 
  } catch (error) {
    throw error;
  }
};

//get reviews by product
const getReviewsByProduct = async (productId) => {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT reviews.*, products.name AS "productName"
            FROM reviews
            JOIN products ON reviews."productId" = products.id
            WHERE "productId" = $1;
        `,
      [productId]
    );
    return reviews;
  } catch (error) {
    throw error;
  }
};

//create reviews
const createReview = async ({ userId, productId, description, rating }) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews ("userId", "productId", description, rating)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
      [userId, productId, description, rating]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

//Update reviews
const updateReview = async ({ id, ...fields }) => {
  const setString = Object.keys(fields)
    .map((field, index) => {
      return `"${field}" = $${index + 1}`;
    })
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            UPDATE reviews
            SET ${setString}
            WHERE id = ${id}
            RETURNING *;
        `,
      Object.values(fields)
    );
    return review;
  } catch (error) {
    throw error;
  }
};

//delete reviews
const deleteReview = async (id) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            DELETE FROM reviews
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByUser,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
};
