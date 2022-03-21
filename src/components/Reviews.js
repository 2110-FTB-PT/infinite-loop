import React from "react";
import { useState, useEffect } from "react";
import { fetchReviews } from "../axios-services";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    const handleReviews = async () => {
        const fetchedReviews = await fetchReviews();
        setReviews(fetchedReviews);
    }

    useEffect(() => {
        handleReviews();
    }, []);

    return (
        <div>
            <h2>Reviews</h2>
            <hr/>
            {reviews.map((review) => {
                return(
                <div key={ review.id }>
                    <div> Description: {review.description} </div>
                    <div> Rating: {review.rating} </div>
                    <br></br>
                </div>
                )
            })}
        </div>
    )
};

export default Reviews;