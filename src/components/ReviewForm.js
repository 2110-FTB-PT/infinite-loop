import React from "react";
import "../style/ReviewForm.css";

const ReviewForm = ({ errorMsg, handleSubmit, review, setReview }) => {
  return (
    <div className='review-content-container'>
      <div className='add-review-header'>Add Review</div>
      <div className='review-form'>
        <form onSubmit={handleSubmit}>
          {/* userId, productId, description, rating */}
          <div className='review-content'>
            <div className='product-review-description'>
              Leave a review and rating for the plants that you love! Give this
              plant a rating between 1 to 5 stars (5 being highly recommended).
            </div>

            <div className='product-review-label'>Comment</div>
            <input
              className='product-review-input-field'
              value={review.description}
              placeholder='Write review here'
              onChange={(e) => {
                setReview({ ...review, description: e.target.value });
              }}
            />
            <div className='product-review-label'>Rate</div>
            <input
              className='product-review-input-field'
              value={review.rating}
              placeholder='Example: 5'
              onChange={(e) => {
                setReview({ ...review, rating: e.target.value });
              }}
            />
            <button className='product-review-add-button' type='submit'>
              Submit
            </button>
            {errorMsg && <p>{"You may only write 1 review per product"}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
