import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import OrderResponse from "../../models/OrderResponse";
const OrderData: React.FC = () => {
  const [orderDataList, setOrderDataList] = useState<OrderResponse[]>([]);
  const history = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        };

        const response = await axios.get<OrderResponse[]>(
          "http://localhost:8888/order/get-cart",
          config
        );
        setOrderDataList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (orderId: string) => {
    history(`/cart/view?orderId=${orderId}`);
  };

  const handleDeleteClick = (orderId: string) => {
    history(`/cart/delete?orderId=${orderId}`);
  };

  if (orderDataList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Created At</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderDataList.map((orderData) => (
            <tr key={orderData.orderId}>
              <td>{orderData.orderId}</td>
              <td>{orderData.createdAt}</td>
              <td>{orderData.total}</td>
              <td>{orderData.status}</td>
              <td>
                <button onClick={() => handleViewClick(orderData.orderId)}>
                  View
                </button>
                <button onClick={() => handleDeleteClick(orderData.orderId)}>
                  Delete
                </button>
                <button onClick={() => handleDeleteClick(orderData.orderId)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderData;
