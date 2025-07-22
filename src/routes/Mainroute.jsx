import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Aboutauthor from "../components/Aboutauthor";
import Register from "../components/Register";

// Lazy load Home
const Home = lazy(() => import("../components/Home"));

const Mainroute = () => {
  return (
    <Suspense fallback={<div className="text-center my-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<Aboutauthor />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default Mainroute;
