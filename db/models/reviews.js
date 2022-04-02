const client = require("../client");

const addProductsAndUserToReview = async (reviews) => {
  const reviewIdArray = reviews.map((review) => {
    return review.id;
  })

  const { rows: products } = await client.query(`
    SELECT products.*
    FROM products
    JOIN reviews
    ON products.id = reviews."productId"
    WHERE reviews.id IN (${reviewIdArray});
  `)

  const { rows: users } = await client.query(`
    SELECT users.* 
    FROM users
    JOIN reviews
    ON users.id = reviews."userId"
    WHERE reviews.id IN (${reviewIdArray});
  `)

  reviews.forEach((review) => {
    review.product = products.filter((product) => {
      return review.productId === product.id
    })[0]

    review.user = users.filter((user) => {
      return review.userId === user.id
    })[0]
  })

  return reviews;
}

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

const getReviewById = async (id) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            SELECT * FROM reviews
            WHERE id=$1;
        `,
      [id]
    );

    const { rows: [product] } = await client.query(`
      SELECT products.*, reviews."productId", reviews.description, reviews.rating, reviews.id AS "reviewId"
      FROM reviews
      JOIN products
      ON products.id = reviews."productId"
      WHERE reviews.id = $1;
    `, [id]);
  
    review.product = product
    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewsByUser = async (username) => {
  try {
    const { rows: reviews } = await client.query(
      `
            SELECT reviews.*
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
    return await addProductsAndUserToReview(reviews); 
  } catch (error) {
    throw error;
  }
};

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
