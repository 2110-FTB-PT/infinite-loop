const BASE_URL = "/api";
import axios from "axios";

export const fetchOrder = async (id) => {
  try {
    const { data: order } = await axios.get(`${BASE_URL}/orders/:orderId`);
    console.log("order:", order);
    return order;
  } catch {
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
