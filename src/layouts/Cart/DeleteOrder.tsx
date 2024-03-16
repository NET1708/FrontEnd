import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get("orderId");
    if (orderId) {
      deleteOrder(orderId);
    } else {
      // Handle case when orderId is not available in the query parameter
      console.error("Invalid orderId");
    }
  }, [location.search]);

  const deleteOrder = async (orderId: string) => {
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

      await axios.post("http://localhost:8888/order/delete", body, config);
      console.log("Order deleted successfully");
      navigate("/cart");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return <div>Deleting order...</div>;
};

export default DeleteOrder;
