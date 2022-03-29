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
      {myReviews ? (
      <div className='table-wrapper'>
        <table className='orders-table'>
          <tr className='table-headers'>
            <th>Rating</th>
            <th>Description</th>
            <th>Product</th>
            <th>Preview</th>
          </tr>
            {myReviews.map((review) => {
              const { id, rating, description, product } = review;
              return (
                <tr>
                  <td>{rating}</td>
                  <td>{description}</td>
                  <td>{product && product.name}</td>
                  {
                    <td> Edit  
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
    ) : <p>Shop now to add a review!</p>}
    </div>
  );
};

export default MyReviews;
