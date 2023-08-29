import Index from "../components/Admin";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import ShopIndex from "../components/index";
import ShopProducts from "../pages/Products";
import ProductsInfo from "../pages/ProductsInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PanelProducts from "../pages/Admin/Products";
import Shipping from "../pages/Shipping";
import SearchResult from "../components/SearchResult";
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

const route = [
  { path: "shop", element: <ShopIndex /> },
  { path: "", element: <ShopIndex /> },
  { path: "products", element: <ShopProducts /> },
  { path: "products/:productID", element: <ProductsInfo /> },
  { path: "checkout", element: <CheckOut /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "checkout/shipping", element: <Shipping /> },
  { path: "/search/:searchTerm", element: <SearchResult /> },
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
    ],
  },
];

export default route;
