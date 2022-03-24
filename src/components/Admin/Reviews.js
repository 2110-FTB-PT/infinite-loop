import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchReviews } from "../../axios-services/index";
import "../../style/Reviews.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([])

    const handleReviews = async () => {
        const allReviews = await fetchReviews();
        console.log('all react reviews: ', allReviews)
        setReviews(allReviews);
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
                    </tr>
                    {reviews.map((review) => {
                        const { description, rating, products } = review;
                        return (
                            <tr>
                                <td>{description}</td>
                                <td>{rating}</td>
                                {products.map((product) => {
                                    return (
                                        <td>{product.name}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default Reviews;