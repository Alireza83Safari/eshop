import React from "react";
import { Navigate } from "react-router-dom";
import Index from "../components/Admin";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Products";
import ProductInfo from "../pages/ProductInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PanelProducts from "../pages/Admin/Products";
import Shipping from "../pages/Shipping";
import Roles from "../pages/Admin/Roles";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import CheckOut from "../pages/CheckOut";
import Profile from "../pages/Profile";
import ProfileAddress from "../components/Profile/ProfileAddress";
import ProfileFavorite from "../components/Profile/ProfileFavorite";
import ProfileOrders from "../components/Profile/ProfileOrders";
import ProfileComments from "../components/Profile/ProfileComments";
import PrivateRoute from "../components/Admin/PrivateRoute";
import Home from "../pages/Home";
import AppPic from "../pages/Admin/AppPic";
import Category from "../pages/Admin/Category";
import Brand from "../pages/Admin/Brand";
import Discount from "../pages/Admin/Discount";
import Color from "../pages/Admin/Color";
import Page404 from "../components/Page404";
import Contact from "../pages/Contact";

const route = [
  { path: "", element: <Home /> },
  { path: "products", element: <Products /> },
  { path: "product/:productID", element: <ProductInfo /> },
  { path: "checkout", element: <CheckOut /> },
  { path: "contact", element: <Contact /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "checkout/shipping", element: <Shipping /> },
  { path: "*", element: <Page404 /> },
  {
    path: "profile/*",
    element: <Profile />,
    children: [
      { path: "address", element: <ProfileAddress /> },
      { path: "favorite", element: <ProfileFavorite /> },
      { path: "orders", element: <ProfileOrders /> },
      { path: "comments", element: <ProfileComments /> },
    ],
  },
  {
    path: "/panel/*",
    element: <Index />,
    children: [
      { path: "*", element: <Page404 /> },
      {
        path: "",
        element: (
          <PrivateRoute>
            <Navigate to="dashboard" />
          </PrivateRoute>
        ),
      },
      {
        path: "category",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "brand",
        element: (
          <PrivateRoute>
            <Brand />
          </PrivateRoute>
        ),
      },
      {
        path: "color",
        element: (
          <PrivateRoute>
            <Color />
          </PrivateRoute>
        ),
      },
      {
        path: "discount",
        element: (
          <PrivateRoute>
            <Discount />
          </PrivateRoute>
        ),
      },
      {
        path: "product",
        element: (
          <PrivateRoute>
            <PanelProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "Orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "comments",
        element: (
          <PrivateRoute>
            <Comments />
          </PrivateRoute>
        ),
      },

      {
        path: "roles",
        element: (
          <PrivateRoute>
            <Roles />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "appPic",
        element: (
          <PrivateRoute>
            <AppPic />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default route;
