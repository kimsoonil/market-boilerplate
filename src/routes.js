import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import Cookies from "universal-cookie";

import ProductModel from "src/views/ProductModel";
import ProductDetails from "src/views/ProductDetails";
import ProductList from "src/views/ProductList";
import Login from "src/views/Login";
import ProductPurchase from "src/views/ProductPurchase";
import ProductInform from "src/views/ProductInform";
import AddressPopup from "src/components/AddressPopup";
import SignUp from "src/views/Login/SignUp";
import Email from "src/views/Login/Email";
import ProductPurchaseInfo from "src/views/ProductPurchaseInfo";

const cookies = new Cookies();
const token = cookies.get("token");
console.log("token", token);
const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/models", exact: true, element: <ProductModel /> },
      { path: "/model/:id", exact: true, element: <ProductDetails /> },
      { path: "/model/:id/products", exact: true, element: <ProductList /> },

      { path: "/products/:id", exact: true, element: <ProductInform /> },

      {
        path: "/products/:id/payment/:payment",
        element: <ProductPurchase />,
      },
      {
        path: "/purchase/:id",
        exact: true,
        element: <ProductPurchaseInfo />,
      },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/email", element: <Email /> },
      { path: "/", element: <Navigate to="/models" /> },
      { path: "*", element: <Navigate to="/models" /> },
    ],
  },
  { path: "/address", exact: true, element: <AddressPopup /> },
];

export default routes;
