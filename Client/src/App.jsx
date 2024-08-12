import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import ProductDetail from "./components/ProductDetailedPage";
import CartPage from "./components/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Success from "./components/success";
import OrdersPage from "./components/orders";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<OrdersPage />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
