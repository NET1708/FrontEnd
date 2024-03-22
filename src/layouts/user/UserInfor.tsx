// UserInfo.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defineNumber from "../utils/defineNumber";


// Interface for user data
interface UserData {
  fullName: string;
  username: string;
  email: string;
  studentCode: string;
  password: string;
  address: string;
  phone: string;
  avatar: string;
  gender: string;
  isActive: boolean;
  activationCode: string;
}


const UserInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [orderList, setOrderList] = useState<any[]>([]);
  const totalOrder = orderList.length;
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const url = "http://localhost:8888/account/profile";

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
        } else {
          throw new Error("Error fetching user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    if(userData?.avatar) {
      setUserAvatar(userData.avatar);
    } else {
      setUserAvatar("./../../../images/public/default.jpg");
    }

    const getOrder = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const url = "http://localhost:8888/order/get-cart";

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrderList(data);
        } else {
          throw new Error("Error fetching data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getOrder();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const handleOrderDetail = (orderId: string) => {
    history("/cart/view?orderId=" + orderId);
  };

  return (
    <div>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height:'200px'}}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px'}}>
                    <img src={userAvatar}
                      alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', height: '150px', borderRadius: '50%', zIndex: 1}}/> 
                      <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                        style={{ width: '150px', height: '40px', borderRadius: '20px', fontSize: '12px', zIndex: 2}}>
                        Edit profile
                      </button>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px'}}>
                    <h5>{userData.fullName} <i className="fas fa-check-circle" style={{ color: 'green'}}></i></h5>
                    <p>Cộng đồng người việt sinh sống tại Cali <i className="fas fa-heart" style={{ color: 'red'}}></i></p>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">{totalOrder? totalOrder: 0}</p>
                      <p className="small text-muted mb-0">Orders</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Thông tin</p>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p className="font-italic mb-1">{userData.email}</p>
                      <p className="font-italic mb-1">{userData.phone}</p>
                      <p className="font-italic mb-0">{userData.address}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent order: </p>
                  </div>
                  <div className="row g-2">
                    {
                      orderList.length > 0 ? orderList.map((order, index) => {
                        return (
                          <div className="col-md-6 order" key={index} onClick={() => handleOrderDetail(order.orderId)}>
                            <div className="card p-3">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                  <div className="icon"> <i className="bx bxl-mailchimp"></i> </div>
                                  <div className="ms-2 c-details">
                                    <h6 className="mb-0">Order ID: {order.orderId}</h6>
                                  </div>
                                </div>
                                <div className="badge">
                                  {
                                    order.status === 0 ? 
                                    <span className="badge bg-warning">Pending</span> : 
                                    <span className="badge bg-success">Success</span>
                                  }
                                 </div>
                              </div>
                              <div className="mt-2 justify-content-start">
                                <hr/>
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center"> <i className="bx bxl-mailchimp text-black"></i>
                                    <p className="text-black mb-0"> {order.price}</p>
                                  </div>
                                  <div className="d-flex flex-row align-items-center me-5 "> <i className="bx bxl-mailchimp text-black"></i>
                                    <p className="text-black mb-0 me-5"> Ngày đặt: {handleDate(order.createdAt)}</p>
                                  </div>
                                  <div className="d-flex flex-row align-items-center"> <i className="bx bxl-mailchimp text-black"></i>
                                    <p className="text-black mb-0"> {defineNumber(order.total)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                      : <div className="text-center">
                          <span className="text-muted">No order yet</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default UserInfo;
