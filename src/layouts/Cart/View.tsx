import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import defineNumber from "../utils/defineNumber";

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
  isIcon: boolean;
}

const CartView: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [imageDataMap, setImageDataMap] = useState<Map<number, ImageData>>(
    new Map()
  );
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
      const response = await fetch(
        "http://localhost:8888/images/get",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

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

  useEffect(() => {
    const loadImageData = async () => {
      for (const orderDetail of orderDetails) {
        const imageData = await fetchImageData(orderDetail.course.courseId);
        if (imageData) {
          setImageDataMap((prevImageDataMap) =>
            new Map(prevImageDataMap).set(orderDetail.orderDetailId, imageData)
          );
        }
      }
    };

    loadImageData();
  }, [orderDetails]);

  if (orderDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        orderDetails.map((orderDetail) => {
          const imageData = imageDataMap.get(orderDetail.orderDetailId);
          return (
            <section className="vh-100" style={{ backgroundColor:'fdccbc'}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <p><span className="h2">Chi tiết đơn hàng </span></p>

        <div className="card mb-4">
          <div className="card-body p-4">

            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={imageData?.imageData}
                  className="img-fluid" alt="Generic placeholder image"/>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Name</p>
                  <p className="lead fw-normal mb-0">{orderDetail.course.courseName}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Rate</p>
                  <p className="lead fw-normal mb-0">
                    {orderDetail.course.rates ? orderDetail.course.rates.length : 0} stars</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Quantity</p>
                  <p className="lead fw-normal mb-0">1</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Price</p>
                  <p className="lead fw-normal mb-0">{defineNumber(orderDetail.price)}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Total</p>
                  <p className="lead fw-normal mb-0">{defineNumber(orderDetail.price)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="card mb-5">
          <div className="card-body p-4">

            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span> <span
                  className="lead fw-normal">{defineNumber(orderDetail.price)}</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
          );
        })
      }
    </div>
  );
};

export default CartView;
