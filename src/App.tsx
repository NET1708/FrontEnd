import React, { useState } from "react";
import "./App.css";
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import CourseDetail from "./layouts/product/CourseDetail";
import Policy from "./layouts/about/Policy";
import RegisterAccount from "./layouts/user/RegisterAccount";
import LoginPage from "./layouts/homepage/LoginPage";
import CourseForm_Admin from "./layouts/admin/CourseForm";
import CategoryForm_Admin from './layouts/admin/CategoryForm';
import Component_403 from "./layouts/error/Component_403";
import ActivateAccount from "./layouts/user/ActivateAccount";
import OrderData from "./layouts/Cart/CartDetail";
import CartView from "./layouts/Cart/View";
import DeleteOrder from "./layouts/Cart/DeleteOrder";
import { ChapterDetail } from "./layouts/product/ChapterDetail";
import ForgotPassword from './layouts/user/ForgotPassword';
import PayOrder from "./layouts/Cart/PayOrder";
import ChapterDetailWrapper from "./layouts/product/components/ChapterDetailWrapper";
function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <HomePage searchKey={searchKeyword} />
            </ChapterDetailWrapper>
          } />
          <Route
            path="/:categoryId"
            element={<HomePage searchKey={searchKeyword} />}
          />
          <Route path="/course/:courseId" element={
          <ChapterDetailWrapper
            searchKey={searchKeyword}
            setSearchKey={setSearchKeyword}
          >
            <CourseDetail />
          </ChapterDetailWrapper>
          } />
          <Route path="/register" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <RegisterAccount />
            </ChapterDetailWrapper>
          } />
          <Route path="/activate/:email/:code" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <ActivateAccount />
            </ChapterDetailWrapper>
          } />
          <Route path="/login" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <LoginPage />
            </ChapterDetailWrapper>
          } />
          <Route path="/cart" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <OrderData />
            </ChapterDetailWrapper>
          } />
          <Route path="/cart/view" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <CartView />
            </ChapterDetailWrapper>
          } />
          <Route path="/cart/delete" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <DeleteOrder />
            </ChapterDetailWrapper>
          } />
          <Route path="/cart/pay" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
              >
              <PayOrder />
              </ChapterDetailWrapper>
            } />
          <Route path="/admin/add-course" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <CourseForm_Admin />
            </ChapterDetailWrapper>
          } />
          <Route path='/admin/add-category' element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <CategoryForm_Admin />
            </ChapterDetailWrapper>
          } />
          <Route
            path="/course/:courseId/chapter/:chapterId"
            element={
              <ChapterDetailWrapper
                searchKey={searchKeyword}
                setSearchKey={setSearchKeyword}
              >
                <ChapterDetail />
              </ChapterDetailWrapper>
            }
          />
          <Route path="/403-forbidden" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <Component_403 />
            </ChapterDetailWrapper>
          } />
          <Route path="/about" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <About />
            </ChapterDetailWrapper>
          } />
          <Route path='/forgot-password' element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <ForgotPassword />
            </ChapterDetailWrapper>
          } />
          <Route path="/policy" element={
            <ChapterDetailWrapper
              searchKey={searchKeyword}
              setSearchKey={setSearchKeyword}
            >
              <Policy />
            </ChapterDetailWrapper>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
