import React from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../axios-services";
import { useState, useEffect } from 'react';


const EditProduct = () => {
    const [product, setProduct] = useState([])
    const params = useParams();
    const { id } = params;
    console.log('id ', id)

    const handleProduct = async () => {
        const singleProduct = await fetchSingleProduct(id)
        setProduct(singleProduct)
    }

    useEffect(() => {
        handleProduct();
    }, []);
    
    return (
        <div>
            <h1>Edit Product</h1>
            <form>
                <input placeholder="name" />
                <input placeholder="photo url" />
                <input placeholder="description" />
                <input placeholder="price" />
                <input placeholder="category" />
                <input placeholder="name"/>
                <button>Save</button>
                <button>Delete Product</button>
            </form>
        </div>
    )
}

export default EditProduct; 