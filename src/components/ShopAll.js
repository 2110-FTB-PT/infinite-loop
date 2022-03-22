import React from "react";
import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../axios-services/index'

const ShopAll = () => {
    const [ products, setProducts ] = useState([])

    const handleProducts = async () => { 
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
    } 

    const handleAddToCart = async () => {
        
    }

    useEffect(() => {
        handleProducts();
    }, []);

    return ( 
        <div>
            <h1>All Products</h1>
            {products.map((product) => {
                const { name, price, photo } = product
                return (
                    <div>
                        <img src={photo}/>
                        <p>{name}</p>
                        <p>{price}</p>
                        <button onClick>Add To Cart</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ShopAll;