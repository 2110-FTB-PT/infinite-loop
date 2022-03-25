import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../axios-services";
import { FaRegEdit } from 'react-icons/fa'
import "../../style/Products.css"

// TO DO:
// - add edit product functionality
// - add delete product functionality
// - add new product functionality


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
            <Link to="/admin"><h1>Back to Admin Dashboard</h1></Link>

            <h1>Products</h1>
            <button onClick={() => navigate('/admin/addproduct')}>Add Product</button>
            <div className="table-wrapper">
                <table className="products-table">
                    <tr className="table-headers">
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        {<th>Edit<FaRegEdit /></th>}
                    </tr>
                    {products.map((product) => {
                        const { id, name, description, category, quantity, price, photo } = product;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{quantity}</td>
                                {<td><FaRegEdit
                                    role="button"
                                    className="edit-btn"
                                    onClick={() => navigate(`/admin/products/${id}`)}
                                />
                                </td>}
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default Products;