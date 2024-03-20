import React, { useEffect, useState } from "react";
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

interface ImageData {
  imageId: number;
  imageName: string;
  url: string;
  imageData: string;
  course: any;
  icon: boolean;
}

const CartView: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [imageData, setImageData] = useState<ImageData>();
  const location = useLocation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderId = new URLSearchParams(location.search).get("orderId");
        const token = localStorage.getItem("token") || "";
        const requestBody = {
          orderID: orderId,
        };
        const config: RequestInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch(
          "http://localhost:8888/order/get-detail",
          config
        );

        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  const fetchImageData = async (courseID: number) => {
    try {
      const requestBody = {
        courseID: courseID,
      };
      const response = await fetch("http://localhost:8888/images/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const imageData = await response.json();
        return imageData;
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (orderDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Course Name</th>
            <th>Rating</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail) => {
            fetchImageData(orderDetail.course.courseId);
            return (
              <tr key={orderDetail.orderDetailId}>
                <td>
                  {imageData ? (
                    <img src={imageData.imageData} alt="Course" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{orderDetail.course?.courseName}</td>
                <td>{orderDetail.course?.averageRating}</td>
                <td>{orderDetail.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartView;
