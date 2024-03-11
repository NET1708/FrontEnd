import React from "react";

function Footer() {
  return (
    <div className="container">
      <footer className="py-5">
        <div className="row">
          <div className="col-6 col-md-2 mb-3">
            <h5>Khóa học</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Toán học
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Ngữ văn
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Ngoại ngữ
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Khoa học tự nhiên
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Xem tất cả
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Hỗ trợ</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Liên hệ
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Đóng góp ý kiến
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>Về chúng tôi</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Giới thiệu
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Đội ngũ
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Cơ hội nghề nghiệp
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-body-secondary">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Đăng ký nhận bản tin</h5>
              <p>Cập nhật hàng tháng về những điều mới mẻ và thú vị từ chúng tôi.</p>
              <div className="row">
                <div className="col-9">
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label className="visually-hidden">Địa chỉ email</label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ email"
                />
              </div>
                </div>
                <div className="col-3">
                  <button type="submit" className="btn btn-primary mb-2">
                    Đăng ký
                  </button>
                </div>
               </div>
            </form>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>&copy; 2023 ANI-TESTLAB, Inc. Đã đăng ký bản quyền.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-body-emphasis" href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
