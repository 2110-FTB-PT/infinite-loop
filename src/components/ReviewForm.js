import React from "react";

const ReviewForm = ({ handleSubmit , review, setReview }) => {
    return (
        <form onSubmit={handleSubmit}>{/* userId, productId, description, rating */}
            <input
                value = {review.description}
                placeholder = "Description"
                onChange = {(e) => {
                    setReview({ ...review, desription: e.target.value })
                }}  
            />
            <input
                value = {review.rating}
                placeholder = "Rating 1-5 stars"
                onChange = {(e) => {
                    setReview({ ...review, rating: e.target.value })
                }}  
            />
            <button>Submit</button>
        </form>
    )
};

export default ReviewForm;