import React from 'react'
import 'chart.js/auto';
import { Bar } from "react-chartjs-2"

const data = {
    labels: ["red", "blue", "yellow", "green", "purple", "orange"],
    datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"]
    }]
}

const ReviewChart = ({ reviews }) => {

    const reviewRating = reviews.map((review) => {
        return review.rating
    })
    console.log('reviews', reviewRating)

    const reviewData = {
        labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
        datasets: [{
            data: [reviewRating]
        }]
    
    }

    return (
        <div>
            <div style={{ width: "1000px", margin: "0 auto"}}>
                <Bar
                    data={reviewData}
                />
            </div>
        </div>
    )
}

export default ReviewChart;