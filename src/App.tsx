import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';

function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <div className="App">
      <Navbar searchKey={searchKeyword} setKey={setSearchKeyword}/>
      <HomePage searchKey={searchKeyword} />
      <Footer />
    </div>
  );
}

export default App;
