import React from "react";
import {
  fetchSingleProduct,
  updateProduct,
  deleteProduct,
} from "../../axios-services";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "../../style/EditProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";
import "../../style/EditProduct.css";
import "../../style/EditMyAccount.css";

const EditProduct = ({ token }) => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const handleProduct = async () => {
    const singleProduct = await fetchSingleProduct(id);
    setProduct(singleProduct);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = await updateProduct(token, product);
      setProduct(updatedProduct);
      toast("Product updated!", {
        progressClassName: "css",
      });
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(token, id);
      navigate("/admin/products");
      toast("Product deleted!", {
        progressClassName: "css",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className='edit-product-page'>
      <div className='edit-product-container'>
        <Link style={{ textDecoration: "none" }} to='/admin/products'>
          <div className='edit-back-to-my-account'>Back to all Products</div>
        </Link>
        <div className='edit-product-content-container'>
          <img className='edit-product-img' src={product.photo} />
          <div className='edit-product-copy-container'>
            <div className='edit-product-label'>Product Name</div>
            <div className='edit-product-info'>{product.name}</div>
            <div className='edit-product-label'>Price</div>
            <div className='edit-product-info'>${product.price}</div>

            <div className='edit-product-label'>Description</div>
            <div className='edit-product-info'>{product.description}</div>
            <div className='edit-product-label'>Quantity</div>
            <div className='edit-product-info'>{product.quantity}</div>
            <div className='edit-product-label'>Category</div>
            <div className='edit-product-info'>{product.category}</div>
          </div>
        </div>
      </div>
      <div className='edit-my-account-container'>
        <div className='edit-my-account-content'>
          <form className='edit-product-container' onSubmit={handleSubmit}>
            <div className='edit-form-content'>
              <label htmlFor='name' className='my-account-form-label'>
                Product Name
              </label>
              <input
                className='my-account-form-input'
                placeholder='name'
                value={product.name}
                onChange={(event) => {
                  setProduct({ ...product, name: event.target.value });
                }}
              />
              <label htmlFor='photo url' className='my-account-form-label'>
                Photo
              </label>
              <input
                className='my-account-form-input'
                placeholder='photo url'
                value={product.photo}
                onChange={(event) => {
                  setProduct({ ...product, photo: event.target.value });
                }}
              />
              <label htmlFor='description' className='my-account-form-label'>
                Description
              </label>
              <input
                className='my-account-form-input'
                placeholder='description'
                value={product.description}
                onChange={(event) => {
                  setProduct({ ...product, description: event.target.value });
                }}
              />
              <label htmlFor='price' className='my-account-form-label'>
                Price
              </label>
              <input
                className='my-account-form-input'
                placeholder='price'
                value={product.price}
                onChange={(event) => {
                  setProduct({ ...product, price: event.target.value });
                }}
              />
              <label htmlFor='quantity' className='my-account-form-label'>
                Quantity
              </label>
              <input
                className='my-account-form-input'
                placeholder='quantity'
                value={product.quantity}
                onChange={(event) => {
                  setProduct({ ...product, quantity: event.target.value });
                }}
              />
              <label htmlFor='category' className='my-account-form-label'>
                Category
              </label>
              <input
                className='my-account-form-input'
                placeholder='category'
                value={product.category}
                onChange={(event) => {
                  setProduct({ ...product, category: event.target.value });
                }}
              />
              <div className='edit-product-buttons'>
                <button className='edit-my-account-save-button'>Save</button>
                {<FaTrashAlt role='button' onClick={() => handleDelete(id)} />}
              </div>
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
