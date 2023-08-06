import Index from "../components/Admin";
import Chat from "../pages/Admin/Chat";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import Financial from "../pages/Admin/Financial";
import ShopIndex from "../components/index";
import CheckOut from "../pages/CheckOut";
import ShopProducts from "../pages/Products";
import ProductsInfo from "../pages/ProductsInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PanelProducts from "../pages/Admin/Products";

const route = [
  { path: "shop", element: <ShopIndex /> },
  { path: "products", element: <ShopProducts /> },
  { path: "products/:productID", element: <ProductsInfo /> },
  { path: "checkout", element: <CheckOut /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },

  {
    path: "/panel/*",
    element: <Index />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <PanelProducts /> },
      { path: "chat", element: <Chat /> },
      { path: "financial", element: <Financial /> },
      { path: "comments", element: <Comments /> },
    ],
  },
];

export default route;
