import { reviewsByProduct, deleteReview } from "../axios-services"
import AddReview from "./AddReview";
import { useState, useEffect } from "react"
import React from "react";

const ReviewsByProduct = ({id, token, user }) => {
    const [productReview, setProductReview] = useState([]);

    const handleReviewsByProduct = async () => {
        try {
            const reviews = await reviewsByProduct(id);
            setProductReview(reviews);
        }   catch (error) {
            console.error(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            const deletedReview = await deleteReview(token, id)
            if (deletedReview) {
                handleReviewsByProduct();
            }
        }   catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
    handleReviewsByProduct();
    }, []);

    return (
        <>
            {token && <AddReview token={token} setProductReview={setProductReview} id={id} user={user}/>}
            <h1>Reviews</h1>
                {productReview ? (
                    productReview.map((review) => {
                        return (
                        <div key={ review.id }>
                            <div>{review.description}</div>
                            <div>{review.rating}</div>
                            {(user?.id === review.userId) && <button onClick={() => handleDelete(review.id)}> Delete </button>}
                        </div>
                        )
                    })
                ): <div>
                    There are no reviews. Add your reviews for 10% off
                </div> }
        </>
    )
}

export default ReviewsByProduct