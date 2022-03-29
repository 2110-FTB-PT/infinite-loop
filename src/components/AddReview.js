import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { createReview, reviewsByProduct } from "../axios-services";
import React from "react";

const AddReview = ({ token, setProductReview, id, user }) => {
  const blankReview = {
    userId: user.id,
    productId: id,
    description: "",
    rating: "",
  };

  const [review, setReview] = useState(blankReview);
  const [errorMsg, setErrorMsg] = useState("")

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      await createReview(token, review);
      const productReviews = await reviewsByProduct(id);
      setProductReview(productReviews);
      setReview(blankReview);
    } catch (error) {
      console.error(error);
      console.log(error.response.data.message)
      setErrorMsg(error)
    }
  };
  return (
    <>
      {token && (
        <ReviewForm
          errorMsg={errorMsg}
          handleSubmit={handleAdd}
          review={review}
          setReview={setReview}
        />
      )}
    </>
  );
};

export default AddReview;
