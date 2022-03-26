import React from "react";
import { fetchSingleProduct, updateProduct, deleteProduct } from "../../axios-services";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa'
import "../../style/EditProduct.css";

const EditProduct = ({ token }) => {
    const [product, setProduct] = useState({})
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const handleProduct = async () => {
        const singleProduct = await fetchSingleProduct(id)
        setProduct(singleProduct)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedProduct = await updateProduct(token, product)
            setProduct(updatedProduct);
            window.scroll({top:0, behavior: "smooth"})
        } catch(error){
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try { 
            await deleteProduct(token, id)
            navigate('/admin/products')
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleProduct();
    }, []);

    return (
        <div>
            <Link to="/admin/products"><h1>Back To All Products</h1></Link>
            <div className="product-container">
                        <div className="product-info">
                            <img className="product-img" src={product.photo} />
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <p>{product.description}</p>
                                <p>{product.quantity}</p>
                                <p>{product.category}</p>
                            </div>
                        </div>
            </div>
            <h2>Edit Product</h2>
            <form className="edit-product-container" onSubmit={handleSubmit}>
                <input
                    placeholder="name"
                    value={product.name}
                    onChange={(event) => { setProduct({ ...product, name: event.target.value }) }}
                />
                <input
                    placeholder="photo url"
                    value={product.photo}
                    onChange={(event) => { setProduct({ ...product, photo: event.target.value }) }}
                />
                <input
                    placeholder="description"
                    value={product.description}
                    onChange={(event) => { setProduct({ ...product, description: event.target.value }) }}
                />
                <input
                    placeholder="price"
                    value={product.price}
                    onChange={(event) => { setProduct({ ...product, price: event.target.value }) }}
                />
                <input
                    placeholder="quantity"
                    value={product.quantity}
                    onChange={(event) => { setProduct({ ...product, quantity: event.target.value }) }}
                />
                <input
                    placeholder="category"
                    value={product.category}
                    onChange={(event) => { setProduct({ ...product, category: event.target.value }) }}
                />
                <button>Save</button>
                {<FaTrashAlt 
                    role="button"
                    onClick={() => handleDelete(id)}
                />}
            </form>
        </div>
    )
}

export default EditProduct;