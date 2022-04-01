import { reviewsByProduct, deleteReview } from "../../axios-services";
import AddReview from "./AddReview";
import { useState, useEffect } from "react";
import React from "react";
import "../../style/ReviewsByProduct.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/Toast.css';
import { FaStar, FaRegStar } from "react-icons/fa";


const ReviewsByProduct = ({ id, token, user }) => {
  const [productReview, setProductReview] = useState([]);
  const { id: userObjectId } = user;

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
      toast("Your review has been deleted!", {
        progressClassName: "css"
      });
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
        <div className='customer-review-header'>Customer Reviews {productReview ? <span>({productReview.length})</span> : null}</div>
        {productReview ? (
          productReview.map((review) => {
            const { description, rating, user } = review;
            return (
              <div className='review-posted-content' key={review.id}>
                <div className='review-posted-description'>
                  {" "}
                  {description}
                </div>
                {rating === 5 && <div className='review-posted-rating'>
                <span><FaStar /></span><span><FaStar /></span><span><FaStar /></span><span><FaStar /></span><span><FaStar /></span>
                </div>}{" "}
                {rating === 4 && <div className='review-posted-rating'>
                <span><FaStar /></span><span><FaStar /></span><span><FaStar /></span><span><FaStar /></span><span><FaRegStar/></span>
                </div>}{" "}
                {rating === 3 && <div className='review-posted-rating'>
                <span><FaStar /></span><span><FaStar /></span><span><FaStar /></span><span><FaRegStar /></span><span><FaRegStar/></span>
                </div>}{" "}
                {rating === 2 && <div className='review-posted-rating'>
                <span><FaStar /></span><span><FaStar /></span><span><FaRegStar /></span><span><FaRegStar /></span><span><FaRegStar/></span>
                </div>}{" "}
                {rating === 1 && <div className='review-posted-rating'>
                <span><FaStar /></span><span><FaRegStar /></span><span><FaRegStar /></span><span><FaRegStar /></span><span><FaRegStar/></span>
                </div>}{" "}
                {user.username === 'guest'
                  ? <div className='review-posted-by-user'>Reviewed by anonymous</div>
                  : <div className='review-posted-by-user'>Reviewed by {user.username}
                  </div>}
                {userObjectId === review?.userId && (
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
