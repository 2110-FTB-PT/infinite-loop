import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../axios-services";

const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    const handleProducts = async () => {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
    };

    useEffect(() => {
        handleProducts();
    }, []);

    return (
        <div>
            <Link to="/admin"><h2>Back to Admin Dashboard</h2></Link>

            <h1>Products</h1>
            {products.map((product) => {
                const { id, name, description, category, quantity, price, photo } = product;
                return (
                    <div>
                        <img className="collection-img" src={photo} />
                        <ul>
                            <li>Name: {name}</li>
                            <li>Description: {description}</li>
                            <li>Price: ${price}</li>
                            <li>Category: {category}</li>
                            <li>Quantity: {quantity}</li>
                            <li>Photo Url: {photo}</li>
                        </ul>
                        <button onClick={() => navigate(`/admin/products/${id}`)}>Edit Product</button>
                    </div>
                );
            })}

        </div>
    );
};

export default Products;