import React from "react";
import { useState, useEffect } from "react";
import { reviewsByUser } from "../../axios-services";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const MyReviews = ({ token, user }) => {
  const [myReviews, setMyReviews] = useState([]);
  const navigate = useNavigate();
  const { username } = user;

  const handleReviews = async () => {
    try {
      const fetchedReviews = await reviewsByUser(username);
      setMyReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleReviews();
  }, [token, user]);

  return (
    <div>
      {myReviews ? (
        <div className="table-wrapper">
          <table className="orders-table">
            <tr className="table-headers">
              <th>Rating</th>
              <th>Description</th>
              <th>Product</th>
              <th>Edit</th>
            </tr>
            {myReviews.map((review) => {
              const { id, rating, description, product } = review;
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
                  {
                    <td>
                      <FaRegEdit
                        role="button"
                        onClick={() => navigate(`/myaccount/review/${id}`)}
                      />
                    </td>
                  }
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <p>Shop now to add a review!</p>
      )}
    </div>
  );
};

export default MyReviews;
