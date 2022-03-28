import { reviewsByProduct, deleteReview } from "../axios-services";
import AddReview from "./AddReview";
import { useState, useEffect } from "react";
import React from "react";
import "../style/ReviewsByProduct.css";

const ReviewsByProduct = ({ id, token, user }) => {
  const [productReview, setProductReview] = useState([]);

  const handleReviewsByProduct = async () => {
    try {
      const reviews = await reviewsByProduct(id);
      setProductReview(reviews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deletedReview = await deleteReview(token, id);
      if (deletedReview) {
        handleReviewsByProduct();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleReviewsByProduct();
  }, []);

  return (
    <>
      <div className='divider'></div>
      <div className='review-posted-header'>Reviews and Ratings</div>
      {token && (
        <AddReview
          token={token}
          setProductReview={setProductReview}
          id={id}
          user={user}
        />
      )}
      <div className='cusomer-review-content-container'>
        <div className='customer-review-header'>Customer Reviews</div>
        {productReview ? (
          productReview.map((review) => {
            return (
              <div className='review-posted-content' key={review.id}>
                <div className='review-posted-description'>
                  {" "}
                  {review.description}
                </div>
                <div className='review-posted-rating'>
                  Rated: {review.rating}
                </div>{" "}
                <div className='review-posted-by-user'>
                  Reviewed by {review.userId}
                </div>
                {user?.id === review.userId && (
                  <button
                    className='review-posted-button'
                    onClick={() => handleDelete(review.id)}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div>There are no reviews. Add your reviews for 10% off!</div>
        )}
      </div>
    </>
  );
};

export default ReviewsByProduct;
