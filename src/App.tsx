import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Header from "./components/nav/header/Header";
import Footer from "./components/nav/footer/Footer";
import ProductList from "./pages/product/ProductInfo";
import ProductRegister from "./pages/product/ProductRegister";
import Mypage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/register" element={<ProductRegister />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
