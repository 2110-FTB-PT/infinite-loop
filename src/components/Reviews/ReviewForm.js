import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../style/ReviewForm.css";

const ReviewForm = ({ errorMsg, handleSubmit, review, setReview }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="review-content-container">
      <div className="add-review-header">Add Review</div>
      <div className="review-form">
        <form onSubmit={handleSubmit}>
          <div className="review-content">
            <div className="product-review-description">
              Leave a review and rating for the plants that you love! Give this
              plant a rating between 1 to 5 stars (5 being highly recommended).
            </div>
            <div className="product-review-label">Comment</div>
            <input
              className="product-review-input-field"
              value={review.description}
              placeholder="Write review here"
              onChange={(e) => {
                setReview({ ...review, description: e.target.value });
              }}
            />
            <div className="product-review-label">Rate</div>
            <div className="star-rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={(e) => {
                        setRating(ratingValue);
                        setReview({ ...review, rating: e.target.value });
                      }}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "orange" : "#08270f"
                      }
                      size={30}
                      onMouseOver={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
              {rating && <p>{rating} stars</p>}
            </div>
            <button
              className="product-review-add-button"
              type="submit"
              onClick={() => setRating(null)}
            >
              Submit
            </button>
            {errorMsg && (
              <p style={{ color: "red" }}>
                {"You may only write 1 review per product"}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
