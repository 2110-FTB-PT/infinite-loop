import React from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../axios-services";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../style/EditProduct.css";

const EditProduct = () => {
    const [product, setProduct] = useState([])
    const params = useParams();
    const { id } = params;
    console.log('id ', id)

    const handleProduct = async () => {
        const singleProduct = await fetchSingleProduct(id)
        console.log('single product: ', singleProduct)
        setProduct(singleProduct)
    }

    useEffect(() => {
        handleProduct();
    }, []);
    
    return (
        <div>
            <Link to="/admin/products"><h1>Back To All Products</h1></Link>
            <div className="product-container">
            {product.map((single) => {
                const { id, name, description, price, photo, quantity, category } = single
                return (
                    <div className="product-info">
                        <img className="product-img" src={photo} />
                        <div className="product-details"> 
                        <h3>{name}</h3>
                        <p>${price}</p>
                        <p>{description}</p>
                        <p>{quantity}</p>
                        <p>{category}</p>
                        </div>
                    </div>
                )
            })}
        </div>
            <h2>Edit Product</h2>
            <form className="edit-product-container">
                <input placeholder="name" />
                <input placeholder="photo url" />
                <input placeholder="description" />
                <input placeholder="price" />
                <input placeholder="quantity" />
                <input placeholder="category"/>
                <button>Save</button>
                <button>Delete Product</button>
            </form>
        </div>
    )
}

export default EditProduct; 