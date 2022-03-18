import axios from 'axios';
import { copyDone } from 'pg-protocol/dist/messages';

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
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function fetchReviews() {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews`);
    return data;
  } catch (err) {
    console.error("Error at fetchReviews", err)
  }
}

export async function reviewsByUser(username) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/username/${username}`);
    return data;
  } catch (err) {
    console.error("Error at reviewsByUser", err)
  }
}

export async function reviewsByProduct(productId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/reviews/product/${productId}`);
    return data;
  } catch (err) {
    console.error("Error at reviewsByProduct", err)
  }
}

export async function createReview(reviewsToAdd, token) {
  try {
    const { data } = await axios.post(`${BASE_URL}/reviews`, reviewsToAdd, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    return data;
  } catch (err) {
    console.error("Error at createReview", err)
  }
}
export async function updateReview(description, rating, reviewId, token) {
  try {
    const { data } = await axios.patch(`${BASE_URL}/reviews/${reviewId}`, {
      description,
      rating,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data;
  } catch (err) {
    console.error("Error at updateReview", err)
  }
}
export async function deleteReview(reviewId, token) {
  try {
    const { data } = await axios.delete(`${BASE_URL}/reviews/${reviewId}`, {
      header: {
        Authorization: `Bearer ${token}`
      }
    })
    return data;
  } catch (err) {
    console.error("Error at deleteReview", err)
  }
}