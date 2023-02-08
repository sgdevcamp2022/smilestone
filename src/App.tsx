import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Header from "./nav/header/Header";
import Footer from "./nav/footer/Footer";
import ProductInfo from "./pages/product/ProductInfo";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<ProductInfo />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
