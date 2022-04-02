import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchReviews, deleteReview } from "../../axios-services/index";
import ReviewChart from "./ReviewChart";
import { FaTrashAlt, FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";
import "../../style/Reviews.css";
import "../../style/Admin.css";
import "../../style/EditMyAccount.css";

const Reviews = ({ token, user }) => {
  const [reviews, setReviews] = useState([]);

  const handleReviews = async () => {
    const allReviews = await fetchReviews();
    setReviews(allReviews);
  };

  const handleDelete = async (id) => {
    try {
      const deletedReview = await deleteReview(token, id);
      if (deletedReview) {
        handleReviews();
        toast("Review is deleted!", {
          progressClassName: "css",
        });
      }
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleReviews();
  }, []);

  return (
    <div className="edit-my-account-container">
      <div className="edit-my-account-content">
        <Link style={{ textDecoration: "none" }} to="/admin">
          <div className="back-to-my-account">Back to Admin Dashboard</div>
        </Link>
        <div className="admin-dashboard-header">Reviews</div>
        <ReviewChart reviews={reviews} />
        <div className="table-wrapper">
          <table className="reviews-table">
            <tr className="table-headers">
              <th>Rating</th>
              <th>Description</th>
              <th>Product Name</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
            {reviews.map((review) => {
              const { id, description, rating, product, user } = review;
              return (
                <tr>
                  {rating === 5 && (
                    <td className="review-posted-rating">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                    </td>
                  )}
                  {rating === 4 && (
                    <td className="review-posted-rating">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                    </td>
                  )}
                  {rating === 3 && (
                    <td className="review-posted-rating">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                    </td>
                  )}
                  {rating === 2 && (
                    <td className="review-posted-rating">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                    </td>
                  )}
                  {rating === 1 && (
                    <td className="review-posted-rating">
                      <span>
                        <FaStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                      <span>
                        <FaRegStar />
                      </span>
                    </td>
                  )}
                  <td>{description}</td>
                  <td>{product && product.name}</td>
                  <td>{user && user.username}</td>
                  <td>
                    <FaTrashAlt
                      role="button"
                      onClick={() => handleDelete(id)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
