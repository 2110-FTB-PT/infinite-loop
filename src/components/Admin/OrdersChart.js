import React from 'react'
import 'chart.js/auto';
import { Bar } from "react-chartjs-2"

const OrdersChart = ({ orders }) => {

    const allOrders = orders.map((order) => {
        const { products } = order;
        let orderTotal = 0
        products.forEach((product) => {
            const { price, quantity } = product;
            const total = price * quantity
            orderTotal += total;
        })
        return orderTotal;
    })

    const orderNumbers = orders.map((order) => {
        return order.id
    })

    const totalRevenue = (arr) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        return sum;
    }
    const rev = totalRevenue(allOrders)

    const ordersData = {
        labels: orderNumbers,
        datasets: [{
            label: "Order Total",
            data: allOrders
        }]
    }

    return (
        <div>
            <h3>Total Revenue: ${rev}</h3>
            <div style={{ width: "1000px", margin: "0 auto" }}>
            <Bar
                data={ordersData}
                options={{
                    scales: {
                        yAxis: {
                            ticks: {
                                stepSize: 1
                            },
                            title: {
                                display: true,
                                text: "Order Total",
                                font: { weight: "bolder" }
                            }
                        }
                    }
                }}
            />
            </div>
        </div>
    )
};


export default OrdersChart;