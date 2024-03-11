import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import CourseDetail from './layouts/product/CourseDetail';
import Policy from './layouts/about/Policy';
import RegisterAccount from './layouts/user/RegisterAccount';
import LoginPage from './layouts/homepage/LoginPage';
import CourseForm_Admin from './layouts/admin/CourseForm';
import Component_403 from './layouts/error/Component_403';

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchKey={searchKeyword} setKey={setSearchKeyword}/>
        <Routes>
          <Route path='/' element={<HomePage searchKey={searchKeyword} />} />
          <Route path='/:categoryId' element={<HomePage searchKey={searchKeyword} />} />
          <Route path='/course/:courseId' element={<CourseDetail />} />
          <Route path='/register' element={<RegisterAccount />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/add-course' element={<CourseForm_Admin />} />
          <Route path='/403-forbidden' element={<Component_403 />} />
          <Route path='/about' element={<About/>} />
          <Route path='/policy' element={<Policy/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
