import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../../axios-services";
import { FaRegEdit } from "react-icons/fa";
import ProductsChart from "./ProductsChart";
import "../../style/Products.css";
import "../../style/Admin.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    const fetchedProducts = await fetchAllProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div className="general-dashboard-container">
      <div className="general-dashboard-content">
        <Link to="/admin" className="general-dashboard-back-link">
          Back to Dashboard
        </Link>
        <div className="general-dashboard-header">Products</div>
        <button
          className="general-dashboard-edit-button"
          onClick={() => navigate("/admin/addproduct")}
        >
          Add Product
        </button>
        <ProductsChart products={products} />
        <div className="table-wrapper">
          <table className="products-table">
            <tr className="table-headers">
              <th>SKU</th>
              <th>Name</th>
              <th>Quantity</th>
              {<th>Edit</th>}
            </tr>
            {products.map((product) => {
              const { id, name, quantity } = product;
              return (
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  {
                    <td>
                      <FaRegEdit
                        role="button"
                        className="edit-btn"
                        onClick={() => navigate(`/admin/products/${id}`)}
                      />
                    </td>
                  }
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
