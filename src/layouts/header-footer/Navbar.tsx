import React, { ChangeEvent, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import LoginPage from "../homepage/LoginPage";
import { get } from "http";
import { getAllCategories } from "../../api/CategoryAPI";
import CategoryModel from "../../models/CategoryModel";
import { jwtDecode } from "jwt-decode";

interface NavbarInterface {
  searchKey: string;
  setKey: (key: string) => void;
}

function Navbar({ searchKey, setKey }: NavbarInterface) {
  let [keyword, setKeyword] = useState("");
  const [listCategory, setListCategory] = useState<CategoryModel[]>([]);

  const searchingCourse = (e: ChangeEvent<HTMLInputElement>) => {
    //khi người dùng nhập vào ô tìm kiếm
    setKeyword(e.target.value);
  };

  //xử lý khi người dùng ấn enter trong ô tìm kiếm
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKey(keyword);
    }
  };

  const handlesearch = () => {
    //khi người dùng nhấn nút tìm kiếm
    setKey(keyword);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setListCategory(await getAllCategories());
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu từ API");
      }
    }
    fetchData();
  }, []);

  //get token
  const token = localStorage.getItem("token");

  const handlelogout = () => {
    localStorage.removeItem("token");
    //navigate to home page
    window.location.href = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          ANI-TESTLAB
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Thể loại
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                {listCategory.map((category, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        className="dropdown-item"
                        to={`/${category.categoryId}`}
                      >
                        {category.categoryName}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/policy">
                Chính sách
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Về chúng tôi
              </a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
            onChange={searchingCourse}
            value={keyword}
            onKeyPress={handleEnter}
          />
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handlesearch}
          >
            <Search />
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        {/* <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="/cart">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul> */}

        {/* Biểu tượng đăng nhập */}
        {!token ? (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="/login">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/register">
                  Đăng ký
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="/profile" >
                  Hồ sơ
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/change-password" >
                  Đổi mật khẩu
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/" onClick={handlelogout}>
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
