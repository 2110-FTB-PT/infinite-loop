import React from 'react'
import 'chart.js/auto';
import { Bar } from "react-chartjs-2"

const ProductsChart = ({ products }) => {

    const productsInventory = products.map((products) => {
        return products.quantity
    })

    const productNames = products.map((product) => {
        return product.name;
    })

    const inventoryValues = Object.values(productsInventory)
    const productValues = Object.values(productNames)

    const productData = {
        labels: productValues,
        datasets: [{
            label: "Inventory",
            data: inventoryValues
        }],
    }


    return (
        <div>
             <div style={{ width: "1100px", margin: "0 auto" }}>
                <Bar
                    data={productData}
                    options={{
                        scales: {
                            yAxis: {
                                ticks: {
                                    stepSize: 1
                                },
                                title: {
                                    display: true,
                                    text: "Inventory",
                                    font: { weight: "bold" }
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ProductsChart;