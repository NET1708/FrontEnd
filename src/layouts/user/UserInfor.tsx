// UserInfo.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const url = "https://api.ani-testlab.edu.vn/account/user-info";

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
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td><strong>Full Name:</strong></td>
            <td>{userData.fullName}</td>
          </tr>
          <tr>
            <td><strong>Username:</strong></td>
            <td>{userData.username}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
          </tr>
          {/* Add more user info fields as needed */}
        </tbody>
      </table>
    </div>
  );

};

export default UserInfo;
