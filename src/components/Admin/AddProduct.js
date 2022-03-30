import React from "react";
import { addNewProduct } from "../../axios-services";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../style/EditProduct.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/Toast.css';

const AddProduct = ({ token }) => {
    const navigate = useNavigate()

    const blankProduct = {
        name: "",
        description: "",
        category: "",
        price: null,
        quantity: null,
        photo: ""
    }

    const [productToAdd, setProductToAdd] = useState(blankProduct);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addNewProduct(token, productToAdd);
            setProductToAdd(productToAdd)
            navigate('/admin/products')
            toast("Product added to catalog!", {
                progressClassName: "css"
            });
        } catch (error) {
            console.dir(error)
        }
    }

    return (
        <div>
            <Link to="/admin/products"><h1>Back To All Products</h1></Link>
            <h2>Add Product</h2>
            <form className="edit-product-container" onSubmit={handleSubmit}>
                <input
                    placeholder="name"
                    value={productToAdd.name}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, name: event.target.value }) }}
                />
                <input 
                    placeholder="photo url"
                    value={productToAdd.photo}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, photo: event.target.value }) }}
                />
                <input 
                    placeholder="description"
                    value={productToAdd.description}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, description: event.target.value }) }}
                />
                <input 
                    placeholder="price"
                    value={productToAdd.price}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, price: event.target.value }) }}
                />
                <input 
                    placeholder="quantity" 
                    value={productToAdd.quantity}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, quantity: event.target.value }) }}
                />
                <input 
                    placeholder="category" 
                    value={productToAdd.category}
                    onChange={(event) => { setProductToAdd({ ...productToAdd, category: event.target.value }) }}    
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddProduct;