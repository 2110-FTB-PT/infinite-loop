import { reviewsByProduct } from "../axios-services"
import { useState, useEffect } from "react"
import React from "react";

const ReviewsByProduct = ({id}) => {
    const [productReview, setProductReview] = useState([]);

    const handleReviewsByProduct = async () => {
        const reviews = await reviewsByProduct(id);
        console.log(reviews)
        setProductReview(reviews);
    };

    useEffect(() => {
    handleReviewsByProduct();
    }, []);

    return (
        <div>
            <h1>Reviews</h1>
                {productReview ? (
                    productReview.map((review) => {
                        return (
                        <div key={ review.id }>
                            <div>{review.description}</div>
                            <div>{review.rating}</div>
                        </div>
                        )
                    })
                ): <div>
                    There are no reviews. Add your reviews for 10% off -Lindsay Hi Kim!
                </div> }
        </div>
    )
}

export default ReviewsByProduct