import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import OrderResponse from "../../models/OrderResponse";
import { colors } from "react-select/dist/declarations/src/theme";
const OrderData: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderResponse[]>();
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
        setOrderData(response.data);
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

  const handleBuyClick = (orderId: string) => {
    history(`/cart/pay?orderId=${orderId}`);
  };

  if (orderData === null) {
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
          {orderData &&
            orderData.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.createdAt}</td>
                <td>{order.total}</td>
                <td className={order.status === 0 ? "waiting" : "bought"}>
                  {order.status === 0 ? "Waiting" : "Bought"}
                </td>
                <td>
                  <button onClick={() => handleViewClick(order.orderId)}>
                    View
                  </button>
                  <button onClick={() => handleDeleteClick(order.orderId)}>
                    Delete
                  </button>
                  {order.status !== 1 && (
                    <button onClick={() => handleBuyClick(order.orderId)}>
                      Buy
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderData;
