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

reviewsRouter.get("/", async (req, res, next) => {
    try {
        const reviews = await  getAllReviews();
        res.send(reviews);
    }   catch (error) {
        console.log("Error at getting all reviews", error);
        next(error);
    }
});

reviewsRouter.post("/", async (req, res, next) => {
    const { description, rating } = req.body;
    try {
        const newReview = await createReview({ description, rating });
        res.send(newReview)
    }   catch (error) {
        console.log("Error at creating a new review", error)
        next(error);
    }
});

reviewsRouter.patch("/:reviewId", async (req, res, next) => {
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

reviewsRouter.delete("/:reviewId", async (req, res, next) => {
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