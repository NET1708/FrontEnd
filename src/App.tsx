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
          <Route path='/about' element={<About/>} />
          <Route path='/policy' element={<Policy/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
