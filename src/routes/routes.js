import React from "react";
import { Navigate } from "react-router-dom";
import Index from "../components/Admin";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import ShopProducts from "../pages/Products";
import ProductsInfo from "../pages/ProductsInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PanelProducts from "../pages/Admin/Products";
import Shipping from "../pages/Shipping";
import SearchResult from "../pages/SearchResult";
import Roles from "../pages/Admin/Roles";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import CheckOut from "../pages/CheckOut";
import ProfilePage from "../pages/ProfilePage";
import ProfileAddress from "../components/Profile/ProfileAddress";
import ProfileFavorite from "../components/Profile/ProfileFavorite";
import ProfileOrders from "../components/Profile/ProfileOrders";
import ProfileComments from "../components/Profile/ProfileComments";
import PrivateRoute from "../components/Admin/PrivateRoute";
import AdminLogin from "../pages/Admin/AdminLogin";
import BrandResult from "../pages/BrandResult";
import CategoryResult from "../pages/CategoryResult";
import Home from "../pages/Home";
import AppPic from "../pages/Admin/AppPic";

const route = [
  { path: "", element: <Home /> },
  { path: "products", element: <ShopProducts /> },
  { path: "products/:productID", element: <ProductsInfo /> },
  { path: "checkout", element: <CheckOut /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "checkout/shipping", element: <Shipping /> },
  { path: "/search/:searchTerm", element: <SearchResult /> },
  { path: "/brand/:brand", element: <BrandResult /> },
  { path: "/category/:category", element: <CategoryResult /> },
  {
    path: "profile/*",
    element: <ProfilePage />,
    children: [
      { path: "address", element: <ProfileAddress /> },
      { path: "favorite", element: <ProfileFavorite /> },
      { path: "orders", element: <ProfileOrders /> },
      { path: "comments", element: <ProfileComments /> },
    ],
  },
  { path: "panel/login", element: <AdminLogin /> },
  {
    path: "/panel/*",
    element: <Index />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Navigate to="dashboard" />
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
