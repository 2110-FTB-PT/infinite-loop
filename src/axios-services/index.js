import axios from 'axios';
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
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export const fetchOrder = async (id) => {
  try {
    const { data: order } = await axios.get(`${BASE_URL}/orders/:orderId`);
    console.log("order:", order);
    return order;
  } catch (error) {
    console.error(error);
  }
};

export const createPendingOrder = async (email, address) => {
  try {
    const {
      data: { pendingOrder },
    } = await axios.post(`${BASE_URL}/orders`, { email, address });
    console.log("pendingOrder", pendingOrder);
    return pendingOrder;
  } catch (error) {
    console.error(error);
  }
};
