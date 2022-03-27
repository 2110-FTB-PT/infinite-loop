import React from "react";
import { useState, useEffect } from "react";
import { reviewsByUser } from "../../axios-services";
import { FaRegEdit } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";

const MyReviews = ({ token, user }) => {
    const [myReviews, setMyReviews] = useState([]);
    const navigate = useNavigate()
    const { username } = user;

    const handleReviews = async () => {
        try {
            const fetchedReviews = await reviewsByUser(username)
            setMyReviews(fetchedReviews)
        } catch (error) {
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
                        <th>Preview</th>
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
                                {<td><FaRegEdit
                                    role="button"
                                    onClick={() => navigate(`/myaccount/review/${id}`)}
                                /></td>}
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
