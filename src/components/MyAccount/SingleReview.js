import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchReviewById, deleteReview, updateReview } from "../../axios-services";
import { FaTrashAlt, FaStar } from 'react-icons/fa'


const SingleReview = ({ token, user }) => {
    const [myReview, setMyReview] = useState({})
    const [updatedReview, setUpdatedReview] = useState({})
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const handleReview = async () => {
        try {
            const fetchedReview = await fetchReviewById(id);
            setMyReview(fetchedReview);
            setUpdatedReview(fetchedReview)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const editedReview = await updateReview(token, updatedReview)
            setMyReview({...myReview, rating: editedReview.rating, description: editedReview.description})
            setUpdatedReview({...updatedReview, rating: editedReview.rating, description: editedReview.description})
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
                <div className="star-rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onChange={(e) => {
                        setRating(ratingValue);
                        setUpdatedReview({...updatedReview, rating: e.target.value})
                      }}
                    />
                    <FaStar className="star" color={ratingValue <= (hover || rating) ? "orange" : "#08270f"} size={30}
                      onMouseOver={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                   )
              })}
              {rating && <p>{rating} stars</p>}
            </div>
                <label htmlFor="description">Description</label>
                <input
                    placeholder="review"
                    value={updatedReview.description}
                    onChange={(event) => { setUpdatedReview({ ...updatedReview, description: event.target.value }) }}
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