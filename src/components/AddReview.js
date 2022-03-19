import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { createReview } from "../axios-services";

const AddReview = ({token}) => {
    
    const blankReview = {
        description: "",
        rating: "",
    };

    const [ reviews, setReviews ] = useState([]);
    const [ review, setReview ] = useState(blankReview);

    const handleAdd = async (e) => {
        try {
            e.preventDefault();
            const newReview = await createReview(review, token);
            setReviews([...reviews, newReview])
            setReview(blankReview);
        }   catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <h2>Add Review</h2>
            {token && <ReviewForm handleSubmit={handleAdd} review={review} setReview={setReview} />}
        </>
    )
};

export default AddReview;