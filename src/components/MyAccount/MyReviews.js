import React from "react";
import { useState, useEffect } from "react";
import { reviewsByUser } from "../../axios-services";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
      <div className='table-wrapper'>
        <table className='orders-table'>
          <tr className='table-headers'>
            <th>Rating</th>
            <th>Description</th>
            <th>Product</th>
            <th>Preview</th>
          </tr>
          {myReviews &&
            myReviews.map((review) => {
              console.log(review);
              const { id, rating, description, product } = review;
              return (
                <tr>
                  <td>{product && product.name}</td>
                  <td>{description}</td>
                  <td>{rating}</td>
                  {
                    <td>
                      <FaRegEdit
                        role='button'
                        onClick={() => navigate(`/myaccount/review/${id}`)}
                      />
                    </td>
                  }
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
