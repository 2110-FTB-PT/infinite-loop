import React from "react";
import { Link } from "react-router-dom";
import { deleteReview } from "../../axios-services/index";

const Reviews = ({ user, token, reviews, setReviews }) => {

    const handleDelete = async (id) => {
        try {
            await deleteReview(id, token)
            const newReviews = reviews.filter((routine) => {
                return routine.id !== id;
            });
            setReviews(newReviews);
        }   catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Link to="/admin"><h1>Back to Admin Dashboard</h1></Link>
            <h1>Reviews</h1>
                        {reviews.map((review) => {
                            return (
                            <div key={ review.id }>
                                <div> productId: {review.productId} </div>
                                <div> Description: {review.description} </div>
                                <div> Rating: {review.rating} </div>
                                {(user?.id === review.id) && <button onClick={() => handleDelete(review.id)}> Delete </button> }
                            </div>
                            )
                        })}
                    </div>
    )
};

export default Reviews;