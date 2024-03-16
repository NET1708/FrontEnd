import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useLocation } from "react-router-dom";

interface OrderDetail {
  orderDetailId: number;
  price: number;
  course: {
    courseId: number;
    courseName: string;
    description: string;
    price: number;
    rates: any[]; // Update the type if needed
    averageRating: number;
  };
  order: {
    orderId: string;
    createdAt: string;
    total: number;
    status: number;
    user: {
      userId: number;
      studentCode: string | null;
      username: string;
      password: string;
      email: string;
      fullName: string;
      address: string;
      phone: string;
      avatar: string | null;
      gender: string;
      activationCode: string;
      rates: any[]; // Update the type if needed
      roles: any[]; // Update the type if needed
      active: boolean;
    };
    transaction: any | null; // Update the type if needed
  };
}

const CartView: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = new URLSearchParams(location.search).get("orderId");
        const token = localStorage.getItem("token") || "";
        const requestBody = {
          orderID: orderId,
        };
        const config: AxiosRequestConfig = {
          headers: {
            token: token,
          },
        };

        const response = await axios.post<OrderDetail[]>(
          "http://localhost:8888/order/get-detail",
          requestBody,
          config
        );

        setOrderDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  if (orderDetails.length === 0) {
    return <div>Loading...</div>;
  }
  console.log(orderDetails);
  return (
    <div>
      <h2>Order Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail) => (
            <tr key={orderDetail.orderDetailId}>
              <td>{orderDetail.course?.courseName}</td>
              <td>{orderDetail.course?.description}</td>
              <td>{orderDetail.course?.averageRating}</td>
              <td>{orderDetail.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartView;
