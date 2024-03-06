import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar searchKey={searchKeyword} setKey={setSearchKeyword}/>
        <Routes>
          <Route path='/' element={<HomePage searchKey={searchKeyword} />} />
          <Route path='/:categoryId' element={<HomePage searchKey={searchKeyword} />} />
          <Route path='/about' element={<About/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
