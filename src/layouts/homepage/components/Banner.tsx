import React from "react";

function Banner() {
  return (
  <div className="p-2 mb-2 bg-dark">
    <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
            <h2 className="display-5 fw-bold">
                Welcome to ANI-TESTLAB
            </h2>
            <p className="col-md-8 fs-4">
                ANI-TESTLAB là nền tảng e-learning giúp bạn học tập mọi lúc, mọi nơi, phù hợp với các bạn học sinh nhỏ tuổi, học sinh cấp 3..
            </p>
            <button className="btn btn-primary btn-lg text-white float-end" type="button">Khám phá ngay</button>
        </div>
    </div>
  </div>
  );
}

export default Banner;
