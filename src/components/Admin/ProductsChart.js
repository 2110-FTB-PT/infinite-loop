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

    const categories = products.map((product) => {
        return product.category;
    })

    console.log('categories: ', categories)
    console.log('productNames: ', productNames)
    console.log('inventory: ', productsInventory)

    return (
        <div>
            Products Chart
        </div>
    )
}

export default ProductsChart;