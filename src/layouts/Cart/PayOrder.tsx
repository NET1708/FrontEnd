import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const config = {
        headers: {
          token: token,
        },
      };

      const body = {
        orderID: orderId,
      };

      await axios.post("https://api.ani-testlab.edu.vn/order/pay", body, config);
      navigate("/cart");
    } catch (error) {
      console.error("Error paying order:", error);
    }
  };

  return <div>Deleting order...</div>;
};

export default PayOrder;
