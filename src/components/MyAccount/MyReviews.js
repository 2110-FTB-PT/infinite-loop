import React from "react";
import { useState, useEffect } from "react";
import { reviewsByUser } from "../../axios-services";

const MyReviews = ({ token, user }) => {
    const [myReviews, setMyReviews] = useState([]);
    const { username } = user;

    const handleReviews = async () => {
        try {
            const fetchedReviews = await reviewsByUser(username)
            setMyReviews(fetchedReviews)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleReviews();
    }, [token, user])

    console.log('myReviews: ', myReviews)

    return (
        <div>
            <h2>My Reviews</h2>
            <div className="table-wrapper">
                <table className="orders-table">
                    <tr className="table-headers">
                        <th>Rating</th>
                        <th>Description</th>
                        <th>Product</th>
                    </tr>
                    {myReviews && myReviews.map((review) => {
                        const { id, rating, description, products } = review;
                        return (
                            <tr>
                                <td>{rating}</td>
                                <td>{description}</td>
                                {products && products.map((product) => {
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
    );
};

export default MyReviews;
