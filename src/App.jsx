import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/context";
import Main from "./pages/main/Main";
import Header from "./components/nav/header/Header";
import Footer from "./components/nav/footer/Footer";
import ProductInfoDelay from "./pages/product/ProductInfo";
import ProductRegister from "./pages/product/ProductRegister";
import ProductDetail from "./pages/product/ProductDetail";
import WebCamClient from "./pages/chat/WebCamClient";
import WebCamStreamer from "./pages/chat/WebCamStreamer";
import Chat from "./pages/chat/Chat";
import Mypage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product" element={<ProductInfoDelay />} />
            <Route path="/product/register" element={<ProductRegister />} />
            <Route path="/product/detail/:id" element={<ProductDetail />} />
            <Route path="/webcam-client" element={<WebCamClient />} />
            <Route path="/webcam-streamer" element={<WebCamStreamer />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
