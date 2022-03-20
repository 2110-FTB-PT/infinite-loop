import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchCategory } from '../axios-services/index'
// import "../style/LargePlants.css";

const MediumPlants = () => {
  const [ medProducts, setMedProducts ] = useState([])
  const params = useParams();
  const { mediumplants } = params;

  const handleMedProducts = async () => {
    const fetchedProducts = await fetchCategory(mediumplants);
    setMedProducts(fetchedProducts)
    console.log('fetched products: ', fetchedProducts)
  }

  useEffect(() => {
    handleMedProducts();
  }, [])

  return (
    <div>
      <h1>Medium Plants</h1>
      {medProducts.map((product) => {
                const { name, price, photo } = product
                return (
                    <div>
                        <p>{name}</p>
                        <p>{photo}</p>
                        <p>{price}</p>
                        <button onClick>Add To Cart</button>
                    </div>
                )
            })}
    </div>
  );
};

export default MediumPlants;
