import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchReviews, deleteReview } from "../../axios-services/index";
import { FaTrashAlt } from 'react-icons/fa'
import "../../style/Reviews.css";

const Reviews = ({ token, user }) => {
    const [reviews, setReviews] = useState([])

    const handleReviews = async () => {
        const allReviews = await fetchReviews();
        setReviews(allReviews);
    }

    const handleDelete = async (id) => {
        try {
            const deletedReview = await deleteReview(token, id)
            if (deletedReview) {
                handleReviews();
            }
            window.scroll({top:0, behavior: "smooth"})
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleReviews();
    }, []);

    return (
        <div>
            <Link to="/admin"><h1>Back to Admin Dashboard</h1></Link>
            <h1>Reviews</h1>
            <div className="table-wrapper">
                <table className="reviews-table">
                    <tr className="table-headers">
                        <th>Rating</th>
                        <th>Description</th>
                        <th>Product Name</th>
                        <th>Username</th>
                        <th><FaTrashAlt /></th>
                    </tr>
                    {reviews.map((review) => {
                        const { id, description, rating, product, user } = review;
                        return (
                            <tr>
                                <td>{rating}</td>
                                <td>{description}</td>
                                <td>{product && product.name}</td>
                                <td>{user && user.username}</td>
                                <td><FaTrashAlt 
                                    role="button"
                                    onClick={() => handleDelete(id)}
                                /></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default Reviews;