import React, { useEffect, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { NavLink } from "react-router-dom";
function Banner() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  //check token
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  useEffect(() => {
    AOS.init({ once: true });
    // Lấy giá trị text từ thuộc tính data-text
    const text = headingRef.current?.getAttribute("data-text");
    const chars = text ? text.split("") : []; // Chia chuỗi thành mảng các ký tự

    let typedText = ""; // Biến lưu trữ ký tự đã được gõ
    let currentIndex = 0; // Chỉ số hiện tại trong mảng ký tự

    // Hàm thực hiện hiệu ứng typing
    const typeText = () => {
      if (currentIndex < chars.length) {
        typedText += chars[currentIndex];
        if (headingRef.current) {
          headingRef.current.innerText = typedText;
        }
        currentIndex++;
        setTimeout(typeText, 150); // Delay giữa các ký tự gõ
      }
    };
    typeText();
  }, [1000]);
  return (
    <div className="p-2 mb-2 bg-dark" >
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
          <h2 className="display-5 fw-bold" data-aos="fade-down" ref={headingRef} data-text='Welcome to ANI-TESTLAB' >
            Welcome to ANI-TESTLAB
          </h2>
          <p className="col-md-8 fs-4" data-aos="fade-right" >
            ANI-TESTLAB là nền tảng e-learning giúp bạn học tập mọi lúc, mọi nơi, phù hợp với các bạn học sinh nhỏ tuổi, học sinh cấp 3..
          </p>
          <NavLink
            className={`btn btn-outline-success btn-lg text-white text-uppercase fw-bold float-end mt-3 hover ${isLoggedIn ? 'hide' : ''}`}
            data-aos="fade-left"
            to="/login"
          >
            Bắt đầu học ngay
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Banner;
