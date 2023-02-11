import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Header from "./nav/header/Header";
import Footer from "./nav/footer/Footer";
import ProductList from "./pages/product/ProductInfo";
import Mypage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
