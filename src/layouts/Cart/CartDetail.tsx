import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface ApiResponse {
  orderId: string;
  createdAt: string;
  total: number;
  status: number;
  user: {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    address: string;
    phone: string;
  };
  transaction: any;
}

const OrderData: React.FC = () => {
  const [orderDataList, setOrderDataList] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        };

        const response = await axios.get<ApiResponse[]>(
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
    console.log(`View button clicked for order ID: ${orderId}`);
  };

  const handleDeleteClick = (orderId: string) => {
    console.log(`Delete button clicked for order ID: ${orderId}`);
    // TODO: Implement delete functionality for the specific order
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderData;
