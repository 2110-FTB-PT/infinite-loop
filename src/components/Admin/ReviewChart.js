import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ReviewChart = ({ reviews }) => {
  const reviewRating = reviews.map((review) => {
    return review.rating;
  });

  const count = {};
  for (const elem of reviewRating) {
    if (count[elem]) {
      count[elem] += 1;
    } else {
      count[elem] = 1;
    }
  }
  const reviewLabels = Object.keys(count);
  const reviewValues = Object.values(count);

  const str = reviewLabels.map((label) => {
    if (label > 1) {
      return label + " stars";
    } else {
      return label + " star";
    }
  });

  const reviewData = {
    labels: str,
    datasets: [
      {
        label: "Reviews",
        data: reviewValues,
      },
    ],
  };

  return (
    <div>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <Bar
          data={reviewData}
          options={{
            scales: {
              yAxis: {
                ticks: {
                  stepSize: 1,
                },
                title: {
                  display: true,
                  text: "Total # of Reviews Per Rating",
                  font: { weight: "bolder" },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReviewChart;
