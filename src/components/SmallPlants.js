import React from "react";
import { useState, useEffect } from 'react';
import { fetchCategory } from '../axios-services/index'
import "../style/Collections.css";

const SmallPlants = () => {
  const [ products, setProducts ] = useState([])

  const handleProducts = async () => {
    const fetchedProducts = await fetchCategory("smallplants");
    setProducts(fetchedProducts)
    console.log('fetched products: ', fetchedProducts)
  }

  useEffect(() => {
    handleProducts();
  }, [])

  return (
    <div>
      <h1>Small Plants</h1>
      {products.map((product) => {
                const { name, price, photo } = product
                return (
                    <div>
                        <img className="collection-img" src={photo}/>                        
                        <p>{name}</p>
                        <p>${price}</p>
                        <button onClick>Add To Cart</button>
                    </div>
                )
            })}
    </div>
  );
};

export default SmallPlants;
