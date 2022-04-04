import React from 'react'
import 'chart.js/auto';
import { Line } from "react-chartjs-2"

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
                 <h3 style={{ marginTop: "40px"}}>Inventory Management</h3>
                 <h4>Total SKUs: {products.length}</h4>
                <Line
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
                                    font: { weight: "bolder" }
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