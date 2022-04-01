import React from 'react'
import 'chart.js/auto';
import { Line } from "react-chartjs-2"

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


    const totalRevenue = (allOrders) => {
        let sum = 0;
        for (let i = 0; i < allOrders.length; i++) {
            sum += allOrders[i]
        }
        return sum;
    }

    const ordersData = {
        labels: orderNumbers,
        datasets: [{
            label: "Order Total",
            data: allOrders
        }]
    }

    return (
        <div>
            <h2>Total Revenue: ${totalRevenue}</h2>
            <Line
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
                                font: { weight: "bold" }
                            }
                        }
                    }
                }}
            />
        </div>
    )
};


export default OrdersChart;