import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCategory } from '../axios-services/index'
import "../style/LargePlants.css";

const LargePlants = () => {
  const [ products, setProducts ] = useState([])

  const handleProducts = async () => {
    const fetchedProducts = await fetchCategory('largeplants');
    setProducts(fetchedProducts)
    console.log('fetched products: ', fetchedProducts)
  }

  useEffect(() => {
    handleProducts();
  }, [])

  return (
    <div>
      <h1>Large Plants</h1>
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
  );
};

export default LargePlants;
