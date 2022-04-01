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

    const count = {};
    for (const elem of reviewRating) {
        if (count[elem]) {
            count[elem] += 1;
        } else {
            count[elem] = 1;
        }
    }

    console.log('reviews', reviews)
    console.table('count: ', count + "stars")
    const reviewLabels = Object.keys(count);


    const reviewValues = Object.values(count);

    console.log('review labels', reviewLabels + "stars")
    console.log('review dataset', reviewValues)

    const reviewData = {
        labels: reviewLabels,
        datasets: [{
            data: reviewValues
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