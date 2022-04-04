import axios from "axios";
const BASE_URL = "/api";

export const getAPIHealth = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/health`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
};

export const register = async (full_name, email, username, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
      full_name,
      email,
      username,
      password,
    });
    const { token, message } = data;
    return [token, message];
  } catch (error) {
    console.dir(error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password,
    });
    const { token, message } = data;
    return [token, message];
  } catch (error) {
    console.dir(error);
    throw error;
  }
};

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/myaccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("error at getUser", error);
  }
};

export const fetchUsers = async () => {
  try {
    const { data: users } = await axios.get(`${BASE_URL}/users`);

    return users;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleUser = async (id) => {
  try {
    const { data: user } = await axios.get(`${BASE_URL}/users/userId/${id}`);

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserForAdmin = async (
  token,
  { id, full_name, email, username, isActive, isAdmin }
) => {
  try {
    const { data: user } = await axios.patch(
      `${BASE_URL}/users/accounts`,
      {
        id,
        full_name,
        email,
        username,
        isActive,
        isAdmin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  token,
  { id, full_name, email, username, password, isActive, isAdmin }
) => {
  try {
    const { data: user } = await axios.patch(
      `${BASE_URL}/users/myaccount`,
      {
        id,
        full_name,
        email,
        username,
        password,
        isActive,
        isAdmin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

export const fetchReviews = async () => {
  try {
    const { data: reviews } = await axios.get(`${BASE_URL}/reviews`);
    return reviews;
  } catch (err) {
    console.error("Error at fetchReviews", err);
  }
};

export const reviewsByUser = async (username) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/${username}`);
    return data;
  } catch (err) {
    console.error("Error at reviewsByUser", err);
  }
};

export const reviewsByProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/reviews/product/${productId}`
    );
    return data;
  } catch (err) {
    console.error("Error at reviewsByProduct", err);
  }
};

export const fetchReviewById = async (id) => {
  try {
    const { data: review } = await axios.get(
      `${BASE_URL}/reviews/reviewId/${id}`
    );

    return review;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (
  token,
  { userId, productId, description, rating }
) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/reviews`,
      {
        userId,
        productId,
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
    throw err;
  }
};

export const updateReview = async (token, { id, description, rating }) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/reviews/${id}`,
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
};

export const deleteReview = async (token, reviewId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error at deleteReview", err);
  }
};

export const fetchOrder = async (id) => {
  try {
    const { data: order } = await axios.get(`${BASE_URL}/orders/${id}`);
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrdersByUser = async (token, username) => {
  try {
    const { data: orders } = await axios.get(
      `${BASE_URL}/orders/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return orders;
  } catch (error) {
    throw error;
  }
};

export const createPendingOrder = async (
  token,
  { first_name, last_name, email, address }
) => {
  try {
    if (!token) {
      const { data: pendingOrder } = await axios.post(`${BASE_URL}/orders`, {
        first_name,
        last_name,
        email,
        address,
      });
      return pendingOrder;
    } else {
      const { data: pendingOrder } = await axios.post(
        `${BASE_URL}/orders`,
        { first_name, last_name, email, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return pendingOrder;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createGuestCart = async () => {
  try {
    const { data: guestCart } = await axios.post(`${BASE_URL}/orders`, {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
    });
    return guestCart;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (
  token,
  id,
  { first_name, last_name, email, address }
) => {
  try {
    if (!token) {
      const { data: processingOrder } = await axios.patch(
        `${BASE_URL}/orders/${id}`,
        {
          first_name,
          last_name,
          email,
          address,
        }
      );
      return processingOrder;
    } else {
      const { data: processingOrder } = await axios.patch(
        `${BASE_URL}/orders/${id}`,
        {
          first_name,
          last_name,
          email,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return processingOrder;
    }
  } catch (error) {
    throw error;
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

    return orders;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleProduct = async (id) => {
  try {
    const { data: product } = await axios.get(
      `${BASE_URL}/products/productid/${id}`
    );

    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  token,
  { id, name, photo, description, price, category, quantity }
) => {
  try {
    const { data: product } = await axios.patch(
      `${BASE_URL}/products/${id}`,
      { name, photo, description, price, category, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return product;
  } catch (error) {
    throw error;
  }
};

export const updateProductQuantity = async (productId, deductedQuantity) => {
  try {
    const { data: product } = await axios.patch(
      `${BASE_URL}/products/stock/${productId}`,
      { deductedQuantity }
    );
    return product;
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
      {
        orderId,
        productId,
        quantity,
      }
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

export const addNewProduct = async (
  token,
  { name, description, category, price, quantity, photo }
) => {
  try {
    const { data: product } = await axios.post(
      `${BASE_URL}/products/add`,
      {
        name,
        description,
        category,
        price,
        quantity,
        photo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (token, id) => {
  try {
    const { data: product } = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderById = async (token, orderId) => {
  try {
    const { data: order } = await axios.delete(
      `${BASE_URL}/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (token, username) => {
  try {
    const { data: order } = await axios.get(
      `${BASE_URL}/orders/cart/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const cancelOrder = async (token, id) => {
  try {
    const {
      data: [order],
    } = await axios.patch(
      `${BASE_URL}/orders/cancel/`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return order;
  } catch (error) {
    throw error;
  }
};

export const createPaymentIntent = async (order) => {
  try {
    const {
      data: { clientSecret: paymentIntent },
    } = await axios.post(`${BASE_URL}/orders/create-payment-intents`, {
      products: order.products,
    });
    return paymentIntent;
  } catch (error) {
    console.error(error);
  }
};

export const confirmOrder = async (id) => {
  try {
    const { data: order } = await axios.patch(`${BASE_URL}/orders/confirm`, {
      id,
    });
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const processOrder = async (id) => {
  try {
    const {
      data: [order],
    } = await axios.patch(`${BASE_URL}/orders/pay`, {
      id,
    });
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const checkoutOrder = async (id) => {
  try {
    const {
      data: [order],
    } = await axios.patch(`${BASE_URL}/orders/checkout`, {
      id,
    });
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const orderPendingOrder = async (id) => {
  try {
    const {
      data: [order],
    } = await axios.patch(`${BASE_URL}/orders/order_pending`, {
      id,
    });
    return order;
  } catch (error) {
    console.error(error);
  }
};
