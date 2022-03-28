import React from "react";

const ReviewForm = ({ handleSubmit , review, setReview }) => {
    return (
        <form onSubmit={handleSubmit}>{/* userId, productId, description, rating */}
        
            <input
                value = {review.description}
                placeholder = "Description"
                onChange = {(e) => {
                    setReview({ ...review, description: e.target.value })
                }}  
            />
            <input
                value = {review.rating}
                placeholder = "Rating 1-5 stars"
                onChange = {(e) => {
                    setReview({ ...review, rating: e.target.value })
                }}  
            />
            <button type="submit">Submit</button>
        </form>
    )
};

export default ReviewForm;