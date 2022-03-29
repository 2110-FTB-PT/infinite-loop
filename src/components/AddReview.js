import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { createReview, reviewsByProduct } from "../axios-services";
import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Toast.css';

const AddReview = ({ token, setProductReview, id, user }) => {
  const blankReview = {
    userId: user.id,
    productId: id,
    description: "",
    rating: "",
  };

  const [review, setReview] = useState(blankReview);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      await createReview(token, review);
      const productReviews = await reviewsByProduct(id);
      setProductReview(productReviews);
      setReview(blankReview);
      if (productReviews.length > 0) { 
        toast("Thank you for your review!", {
        progressClassName: "css"
      })};
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {token && (
        <ReviewForm
          handleSubmit={handleAdd}
          review={review}
          setReview={setReview}
        />
      )}
    </>
  );
};

export default AddReview;
