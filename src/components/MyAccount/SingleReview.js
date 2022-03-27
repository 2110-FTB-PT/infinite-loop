import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchReviewById, deleteReview, updateReview } from "../../axios-services";
import { FaTrashAlt } from 'react-icons/fa'


const SingleReview = ({ token, user }) => {
    const [myReview, setMyReview] = useState({})
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const handleReview = async () => {
        try {
            const fetchedReview = await fetchReviewById(id);
            setMyReview(fetchedReview);
        } catch (error) {
            console.error(error)
        }
    }

    console.log('my review: ', myReview)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedReview = await updateReview(token, myReview)
            setMyReview({...myReview, rating: updatedReview.rating, description: updatedReview.description})
            window.scroll({ top: 0, behavior: "smooth" })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteReview(token, id)
            console.log('review was deleted!')
            navigate('/myaccount')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleReview();
    }, [token, user])

    return (
        <div>
            <Link to="/myaccount"><h1>Back To My Account</h1></Link>
            <div className="product-container">
                <div className="product-info">
                    <div className="product-details">
                        <div>
                            <h3>Rating: {myReview.rating}</h3>
                            <p>Review: {myReview.description}</p>
                            <p>Product: {myReview.product && myReview.product.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Edit Review</h3>
            <form className="edit-product-container" onSubmit={handleSubmit}>
                <label htmlFor="name">Rating</label>
                <input
                    placeholder="rating"
                    value={myReview.rating}
                    onChange={(event) => { setMyReview({ ...myReview, rating: event.target.value }) }}
                />
                <label htmlFor="description">Description</label>
                <input
                    placeholder="review"
                    value={myReview.description}
                    onChange={(event) => { setMyReview({ ...myReview, description: event.target.value }) }}
                />
                <button>Save</button>
                {<FaTrashAlt
                    role="button"
                    onClick={() => handleDelete(id)}
                />}
            </form>
        </div>
    )
}

export default SingleReview;