import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchReviewById } from "../../axios-services";

const SingleReview = ({ token, user }) => {
    const [myReview, setMyReview] = useState([])
    const params = useParams();
    const { id } = params;

    const handleReview = async () => {
        const fetchedReview = await fetchReviewById(id);
        setMyReview(fetchedReview);
    }

    useEffect(() => {
        handleReview();
    }, [token, user])

    console.log('review: ', myReview)

    return (
        <div>
            <Link to="/myaccount"><h1>Back To My Account</h1></Link>
            <div className="product-container">
                <div className="product-info">
                    <div className="product-details">
                        {myReview.map((review) => {
                            const { rating, description, products } = review;
                            return (
                                <div>
                                    <h3>Rating: {rating}</h3>
                                    <p>Review: {description}</p>
                                    {products.map((product) => {
                                        return (
                                            <p>Product: {product.name}</p>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleReview;