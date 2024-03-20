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
function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchKey={searchKeyword} setKey={setSearchKeyword} />
        <Routes>
          <Route path="/" element={<HomePage searchKey={searchKeyword} />} />
          <Route
            path="/:categoryId"
            element={<HomePage searchKey={searchKeyword} />}
          />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/register" element={<RegisterAccount />} />
          <Route path="/activate/:email/:code" element={<ActivateAccount />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<OrderData />} />
          <Route path="/cart/view" element={<CartView />} />
          <Route path="/cart/delete" element={<DeleteOrder />} />
          <Route path="/admin/add-course" element={<CourseForm_Admin />} />
          <Route path='/admin/add-category' element={<CategoryForm_Admin />} />
          <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterDetail />} />
          <Route path="/403-forbidden" element={<Component_403 />} />
          <Route path="/about" element={<About />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
