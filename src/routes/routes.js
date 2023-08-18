import Index from "../components/Admin";
import Chat from "../pages/Admin/Chat";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import ShopIndex from "../components/index";
import CheckOut from "../pages/CheckOut";
import ShopProducts from "../pages/Products";
import ProductsInfo from "../pages/ProductsInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PanelProducts from "../pages/Admin/Products";
import Favorite from "../pages/Favorite";
import Shipping from "../pages/Shipping";
import SearchResult from "../components/SearchResult";
import Page404 from "../components/Page404";
import Roles from "../pages/Admin/Roles";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";

const route = [
  { path: "shop", element: <ShopIndex /> },
  { path: "", element: <ShopIndex /> },
  { path: "products", element: <ShopProducts /> },
  { path: "products/:productID", element: <ProductsInfo /> },
  { path: "checkout", element: <CheckOut /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "favorite", element: <Favorite /> },
  { path: "checkout/shipping", element: <Shipping /> },
  { path: "/search/:searchTerm", element: <SearchResult /> },
  // { path: "*", element: <Page404 /> },

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
