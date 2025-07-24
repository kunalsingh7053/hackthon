import React, { Suspense, lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Products from "../components/Products";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Aboutauthor from "../components/Aboutauthor";
import Register from "../components/Register";
import Profile from "../components/Profile";
import { AppContext } from "../context/AppContext"; 
import ProductDetail from "../components/ProductDetail";
import Checkout from "../components/Checkout";

const Home = lazy(() => import("../components/Home"));

const Mainroute = () => {
  const { currentUser } = useContext(AppContext); 

  return (
    <Suspense fallback={<div className="text-center my-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutauthor />} />
        <Route path="/products" element={<Products />} />



        <Route
          path="/product/:id"
          element={
            currentUser ? <ProductDetail /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/checkout"
          element={
            currentUser ? <Checkout />  : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/cart"
          element={
            currentUser ? <Cart /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/profile"
          element={
            <Profile /> 
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default Mainroute;
