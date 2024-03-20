import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PayOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get("orderId");
    if (orderId) {
      payOrder(orderId);
    } else {
      // Handle case when orderId is not available in the query parameter
      console.error("Invalid orderId");
    }
  }, [location.search]);

  const payOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token") || "";
      const url = "http://localhost:8888/order/pay";

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ orderID: orderId }),
      };

      const response = await fetch(url, config);
      if (response.ok) {
        navigate("/cart");
      } else {
        throw new Error("Error paying order");
      }
    } catch (error) {
      console.error("Error paying order:", error);
    }
  };

  return <div>Processing payment...</div>;
};

export default PayOrder;
