import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  fetchReviewById,
  deleteReview,
  updateReview,
} from "../../axios-services";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";

const SingleReview = ({ token, user }) => {
  const [myReview, setMyReview] = useState({});
  const [updatedReview, setUpdatedReview] = useState({});
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleReview = async () => {
    try {
      const fetchedReview = await fetchReviewById(id);
      setMyReview(fetchedReview);
      setUpdatedReview(fetchedReview);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const editedReview = await updateReview(token, updatedReview);
      setMyReview({
        ...myReview,
        rating: editedReview.rating,
        description: editedReview.description,
      });
      setUpdatedReview({
        ...updatedReview,
        rating: editedReview.rating,
        description: editedReview.description,
      });
      toast("Review updated!", {
        progressClassName: "css",
      });
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(token, id);
      navigate("/myaccount");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleReview();
  }, [token, user]);

  return (
    <div className="edit-my-account-container">
      <div className="edit-my-account-content">
        <div className="edit-form-content">
          <Link style={{ textDecoration: "none" }} to="/myaccount">
            <div className="back-to-my-account">Back to My Account</div>
          </Link>
          <div>
            <div className="my-account-edit-header">Edit Review</div>
            <h3>Current Review</h3>
            <p>Product: {myReview.product && myReview.product.name}</p>
            <p>Review: {myReview.description}</p>
            <p>Rating: {myReview.rating}</p>
          </div>
          <h3>Edit Review</h3>
          <form className="edit-product-container" onSubmit={handleSubmit}>
            <label htmlFor="name">Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label className="account-form-label">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onChange={(e) => {
                        setRating(ratingValue);
                        setUpdatedReview({
                          ...updatedReview,
                          rating: e.target.value,
                        });
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
            <label htmlFor="description" className="account-form-label">
              Description
            </label>
            <input
              className="my-account-form-input"
              placeholder="review"
              value={updatedReview.description}
              onChange={(event) => {
                setUpdatedReview({
                  ...updatedReview,
                  description: event.target.value,
                });
              }}
            />
            <div className="align-between">
              {" "}
              <button className="edit-my-account-save-button">Save</button>
              {<FaTrashAlt role="button" onClick={() => handleDelete(id)} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
