import Index from "../components/Admin";
import Chat from "../pages/Admin/Chat";
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
import Page404 from "../components/Page404";
import Roles from "../pages/Admin/Roles";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";
import CheckOut from "../pages/Checkout/CheckOut";
import ProfilePage from "../pages/ProfilePage";
import ProfileAddress from "../components/Profile/ProfileAddress";
import ProfileFavorite from "../components/Profile/ProfileFavorite";
import ProfileOrders from "../components/Profile/ProfileOrders";
import ProfileComments from "../components/Profile/ProfileComments";

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

  { path: "*", element: <Page404 /> },

  {
    path: "/panel/*",
    element: <Index />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <PanelProducts /> },
      { path: "chat", element: <Chat /> },
      { path: "Orders", element: <Orders /> },
      { path: "comments", element: <Comments /> },
      { path: "roles", element: <Roles /> },
      { path: "users", element: <Users /> },
    ],
  },
];

export default route;
