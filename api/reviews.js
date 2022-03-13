const reviewsRouter = require("express").Router();
//insert query requests here//
const {
    getAllReviews,
    getReviewById,
    getReviewsByUser,
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview,
} = require ("../db")
const { requireUser } = require("./utils");

reviewsRouter.get("/", async (req, res, next) => {
    try {
        const reviews = await  getAllReviews();
        res.send(reviews);
    }   catch (error) {
        console.log("Error at getting all reviews", error);
        next(error);
    }
});

reviewsRouter.post("/", requireUser, async (req, res, next) => {
    const { userId, productId, description, rating } = req.body;
    try {
        const newReview = await createReview({ userId, productId, description, rating });
        res.send(newReview)
    }   catch (error) {
        console.log("Error at creating a new review", error)
        next(error);
    }
});

reviewsRouter.get("/:userId/reviews", async (req, res, next) => {
    const { userId } = req.params;
    //not quite sure how to access username but the functions getReviewsByUser requires a username parameter.
    try {
        const reviewByUser = await getReviewsByUser({
            id: userId,
        });
        res.send(reviewByUser);
    }   catch (error) {
        console.log("Error at getting reviews by user", error);
        next(error);
    }
});

reviewsRouter.get("/:productId/reviews", async (req, res, next) => {
    const { productId } = req.params;
    try {
        const reviewByProduct = await getReviewsByProduct({
            id: productId,
        });
        res.send(reviewByProduct);
    }   catch (error) {
        console.log("Error at getting reviews by product", error);
        next(error);
    }
});

reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
    const { reviewId } = req.params;
    const { description, rating } = req.body;
    try {
        const reviewById = await getReviewById(reviewId);

        if (reviewById.userId === req.user.id) {
            const updatedReviews = await updateReview({
                id: reviewId,
                description,
                rating
            });
            res.send(updatedReviews);
        } else {
            next({
                name: "userUnauthorizeToUpdate",
                message: "User is not authorize to make an update"
            })
        }
    }   catch ({ name, message }) {
        next ({ name, message });
    }
});

reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
    const { reviewId } = req.params;
    try {
        const reviewById = getReviewById(reviewId)
        if (reviewById.userId === req.user.id) {
            const Review = await deleteReview(reviewId)
            res.send(Review)
        }   else {
            next({
                name: "userUnauthorizeToUpdate",
                message: "User is not authorize to delete a review"
            })
        }
    }   catch ({ name, message }) {
        next ({ name, message });
    }
});

module.exports = reviewsRouter;
