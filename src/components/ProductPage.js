import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from '../axios-services/index'
import "../style/ProductPage.css";
import ReviewsByProduct from './ReviewsByProduct'


const ProductPage = ({
    cart,
    setCart,
    handleAddToCart,
    quantity,
    setQuantity
}) => {
    const [product, setProduct] = useState({})
    const params = useParams();
    const { id } = params;

    const handleProduct = async () => {
        const singleProduct = await fetchSingleProduct(id)
        setProduct(singleProduct)
    }

    useEffect(() => {
        handleProduct();
    }, []);

    // TODO: set up quantity buttons 
    // update/patch order 

    return (
        <div>
            <img className="product-img" src={product.photo} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <button>+</button>
            <button>-</button>
            <button
                onClick={() => {
                    handleAddToCart(id);
                }}>
                Add To Cart
            </button>
            <div> <ReviewsByProduct id={id} /> </div>
        </div>
    )
}

export default ProductPage;