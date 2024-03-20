export const createCartOrder = (cartData: any) => {
  const url = "https://api.ani-testlab.edu.vn/order/create/cart";
  const token = localStorage.getItem("token") || "";

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(cartData),
  };

  return fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
};
