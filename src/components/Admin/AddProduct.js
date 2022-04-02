import React from "react";
import { addNewProduct } from "../../axios-services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";
import "../../style/EditMyAccount.css";

const AddProduct = ({ token }) => {
  const navigate = useNavigate();

  const blankProduct = {
    name: "",
    description: "",
    category: "",
    price: null,
    quantity: null,
    photo: "",
  };

  const [productToAdd, setProductToAdd] = useState(blankProduct);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addNewProduct(token, productToAdd);
      setProductToAdd(productToAdd);
      navigate("/admin/products");
      toast("Product added to catalog!", {
        progressClassName: "css",
      });
    } catch (error) {
      console.dir(error);
    }
  };

  return (
    <div className='edit-my-account-container'>
      <div className='edit-my-account-content'>
        <form className='edit-product-container' onSubmit={handleSubmit}>
          <div className='edit-form-content'>
            {" "}
            <Link style={{ textDecoration: "none" }} to='/admin/products'>
              <div className='back-to-my-account'>Back to All Products</div>
            </Link>
            <div className='my-account-edit-header'>Add Product</div>
            <label htmlFor='name' className='my-account-form-label'>
              Plant Name{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='bird of paradise'
              value={productToAdd.name}
              onChange={(event) => {
                setProductToAdd({ ...productToAdd, name: event.target.value });
              }}
            />
            <label htmlFor='name' className='my-account-form-label'>
              Photo URL{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='url'
              value={productToAdd.photo}
              onChange={(event) => {
                setProductToAdd({ ...productToAdd, photo: event.target.value });
              }}
            />
            <label htmlFor='name' className='my-account-form-label'>
              Description{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='thrives in environments that...'
              value={productToAdd.description}
              onChange={(event) => {
                setProductToAdd({
                  ...productToAdd,
                  description: event.target.value,
                });
              }}
            />
            <label htmlFor='name' className='my-account-form-label'>
              Price{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='$59.95'
              value={productToAdd.price}
              onChange={(event) => {
                setProductToAdd({ ...productToAdd, price: event.target.value });
              }}
            />
            <label htmlFor='name' className='my-account-form-label'>
              Quantity{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='1'
              value={productToAdd.quantity}
              onChange={(event) => {
                setProductToAdd({
                  ...productToAdd,
                  quantity: event.target.value,
                });
              }}
            />
            <label htmlFor='name' className='my-account-form-label'>
              Category{" "}
            </label>
            <input
              className='my-account-form-input'
              placeholder='large, medium, or small'
              value={productToAdd.category}
              onChange={(event) => {
                setProductToAdd({
                  ...productToAdd,
                  category: event.target.value,
                });
              }}
            />
            <button className='edit-my-account-save-button'>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
