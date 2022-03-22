import { reviewsByProduct } from "../axios-services"
import { useState, useEffect } from "react"

const ReviewsByProduct = () => {

    const [productReview, setProductReview] = useState([]);

    const handleReviewsByProduct = async () => {
        const productReviews = await reviewsByProduct();
        setProductReview(productReviews);
    };

    useEffect(() => {
    handleReviewsByProduct();
    }, []);

    return (
        <div>
            <h1>Reviews</h1>
                        {productReview.map((productReview) => {
                            return (
                            <div key={ productReview.id }>
                            </div>
                            )
                        })}
                    </div>
    )
}

export default ReviewsByProduct