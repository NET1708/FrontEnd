import axios from "axios";

export const createCartOrder = (cartData: any[]) => {
  const url = "http://localhost:8888/order/create/cart";

  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  return axios
    .post(url, cartData, config)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || "Something went wrong.");
    });
};
