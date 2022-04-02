const reviewsRouter = require("express").Router();
const {
  getAllReviews,
  getReviewById,
  getReviewsByUser,
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
} = require("../db");
const { requireUser } = require("./utils");

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    if (!reviews) {
      next({
        name: "MissingReviews",
        message: "There are no reviews available at this time"
      })
      return;
    }

    res.send(reviews);
  } catch (error) {
    console.error(error);
    next({
      name: "fetchReviewError",
      message: "Cannot get all reviews",
    });
  }
});

reviewsRouter.get("/reviewId/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const review = await getReviewById(id)
    res.send(review)
  } catch(error) {
    next(error)
  }
})

reviewsRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    const reviewByUser = await getReviewsByUser(username);

    if (reviewByUser.length === 0) {
      next({
        name: "InvalidReviews",
        message: "There are no reviews yet!" 
      })
      return;
    }

    res.send(reviewByUser);
  } catch (error) {
    console.error(error);
    next({
      name: "noExistingReviews",
      message: "There are no reviews under that username",
    });
  }
});

reviewsRouter.get("/product/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const reviewsByProduct = await getReviewsByProduct(productId);

    if (reviewsByProduct.length === 0) {
      next({
        name: "MissingReviews",
        message: "There are no reviews available at this time"
      })
      return;
    }

    res.send(reviewsByProduct);
  } catch (error) {
    console.error(error);
    next({
      name: "noExistingReviews",
      message: "There are no reviews for the product",
    });
  }
});

reviewsRouter.post("/", requireUser, async (req, res, next) => {
  const {id} = req.user
  const { productId, description, rating } = req.body;
  try {
    const newReview = await createReview({
      userId:id,
      productId,
      description,
      rating,
    });
    
    res.send(newReview);
  } catch (error) {
    console.log("Error at creating a new review", error);
    next(error);
  }
});

reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
  const { reviewId } = req.params;
  const { description, rating } = req.body;
  try {
    const reviewById = await getReviewById(reviewId);

    if (!reviewById) {
      next({
        name: "InvalidReviewId",
        message: "This review does not exist." 
      })
      return;
    }

    if (reviewById.userId === req.user.id) {
      const updatedReviews = await updateReview({
        id: reviewId,
        description,
        rating,
      });
      res.send(updatedReviews);
    } else {
      next({
        name: "userUnauthorizeToUpdate",
        message: "User is not authorize to make an update",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const reviewById = await getReviewById(reviewId);

    if (!reviewById) {
      next({
        name: "InvalidReviewId",
        message: "This review does not exist." 
      })
      return;
    }

    if (reviewById.userId === req.user.id || req.user.isAdmin === true) {
      const review = await deleteReview(reviewId);
      res.send(review);
    } else {
      next({
        name: "userUnauthorizeToUpdate",
        message: "User is not authorize to delete a review",
      });
    }

  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = reviewsRouter;