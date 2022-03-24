import React from "react";
import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { deleteReview, fetchReviews } from "../../axios-services/index";

const Reviews = () => {
    const [reviews, setReviews] = useState([])

    // const handleDelete = async (id) => {
    //     try {
    //         await deleteReview(id, token)
    //         const newReviews = reviews.filter((routine) => {
    //             return routine.id !== id;
    //         });

    //         const allReviews = await fetchReviews();
    //         console.log('allReviews')
    //         setReviews(allReviews);
    //     }   catch (error) {
    //         console.error(error);
    //     }
    // }

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
                        {reviews.map((review) => {
                            const { id, description, rating, products } = review; 
                            return (
                            <div key={ review.id }>
                                <p> Description: {description} </p>
                                <p> Rating: {rating} </p>
                                {products.map((product) => {
                                    const { name } = product
                                    return (
                                        <div>
                                            <p>{name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            )
                        })}
                    </div>
    )
};

export default Reviews;