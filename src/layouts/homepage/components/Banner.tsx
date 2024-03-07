import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
function Banner() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
  <div className="p-2 mb-2 bg-dark" >
    <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
            <h2 className="display-5 fw-bold" data-aos="fade-down" >
                Welcome to ANI-TESTLAB
            </h2>
            <p className="col-md-8 fs-4" data-aos="fade-right" >
                ANI-TESTLAB là nền tảng e-learning giúp bạn học tập mọi lúc, mọi nơi, phù hợp với các bạn học sinh nhỏ tuổi, học sinh cấp 3..
            </p>
            <button className="btn btn-outline-success btn-lg text-white text-uppercase fw-bold float-end mt-3 hover" data-aos="fade-left" >
                Bắt đầu học ngay
            </button>
        </div>
    </div>
  </div>
  );
}

export default Banner;
