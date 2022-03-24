import axios from "axios";
const BASE_URL = "/api";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get(`${BASE_URL}/health`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export const getUser = async (token) => {
  const response = await fetch(`${BASE_URL}/users/myaccount`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: userObject } = await response.json();
  return userObject;
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    console.log(response);
    const {
      data: { token },
    } = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = async () => {
  try{
    const { data: users } = await axios.get(`${BASE_URL}/users`)

    console.log('users: ', users)
    return users;
  } catch(error) {
    throw error; 
  }
}

export async function fetchReviews() {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews`);
    return data;
  } catch (err) {
    console.error("Error at fetchReviews", err);
  }
}

export async function reviewsByUser(username) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/${username}`);
    return data;
  } catch (err) {
    console.error("Error at reviewsByUser", err);
  }
}

export async function reviewsByProduct(productId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/reviews/product/${productId}`
    );
    return data;
  } catch (err) {
    console.error("Error at reviewsByProduct", err);
  }
}

export async function createReview(reviewsToAdd, token) {
  try {
    const { data } = await axios.post(`${BASE_URL}/reviews`, reviewsToAdd, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error at createReview", err);
  }
}

export async function updateReview(description, rating, reviewId, token) {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/reviews/${reviewId}`,
      {
        description,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.error("Error at updateReview", err);
  }
}

export async function deleteReview(reviewId, token) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
      header: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error at deleteReview", err);
  }
}

export const fetchOrder = async (id) => {
  try {
    const { data: order } = await axios.get(`${BASE_URL}/orders/${id}`);
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const createPendingOrder = async (email, address) => {
  try {
    const { data: pendingOrder } = await axios.post(`${BASE_URL}/orders`, {
      email,
      address,
    });
    return pendingOrder;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllProducts = async () => {
  try {
    const { data: products } = await axios.get(`${BASE_URL}/products`);

    return products;
  } catch (error) {
    throw error;
  }
};

export const fetchAllOrders = async () => {
  try {
    const { data: orders } = await axios.get(`${BASE_URL}/orders`);
    
    console.log('orders: ', orders)
    return orders;
  } catch (error) {
    throw error; 
  }
}

export const fetchSingleProduct = async (id) => {
  try {
    const { data: product } = await axios.get(
      `${BASE_URL}/products/productid/${id}`
    );

    return [product];
  } catch (error) {
    throw error;
  }
};

export const fetchCategory = async (category) => {
  try {
    const { data: products } = await axios.get(
      `${BASE_URL}/products/categories/${category}`
    );

    return products;
  } catch (error) {
    throw error;
  }
};

export const fetchUserOrder = async (username) => {
  try {
    const { data: userOrder } = await axios.get(
      `${BASE_URL}/orders/username/${username}`
    );
    return userOrder;
  } catch (error) {
    console.error(error);
  }
};

export const addProductToCart = async (orderId, productId, quantity) => {
  try {
    const { data: cartProduct } = await axios.post(
      `
      ${BASE_URL}/products_orders`,
      { orderId, productId, quantity }
    );
    return cartProduct;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductOrderById = async (orderId) => {
  try {
    const { data: productOrder } = await axios.get(
      `${BASE_URL}/products_orders/order/${orderId}`
    );
    return productOrder;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = async (productId) => {
  try {
    const { data: product } = await axios.get(
      `${BASE_URL}/products/productid/${productId}`
    );
    return product;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductOrderById = async (products_orderId, quantity) => {
  try {
    const { data: productOrder } = await axios.patch(
      `${BASE_URL}/products_orders/${products_orderId}`,
      { quantity }
    );
    return productOrder;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductOrderById = async (products_orderId) => {
  try {
    const { data: productOrder } = await axios.delete(
      `${BASE_URL}/products_orders/${products_orderId}`
    );
    return productOrder;
  } catch (error) {
    console.error(error);
  }
};