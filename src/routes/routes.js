import Index from "../components/Admin";
import Chat from "../pages/Admin/Chat";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import Financial from "../pages/Admin/Financial";
import Products from "../pages/Admin/Products";

import ShopIndex from "../components/index";

import CheckOut from "../pages/CheckOut";
import Home from "../pages/Home";
import ShopProducts from "../pages/Products";
import ProductsInfo from "../pages/ProductsInfo";

const route = [
  {
    path: "/shop/*",
    element: <ShopIndex />,
    children: [
      { path: "products", element: <ShopProducts /> },
      { path: "products/:productID", element: <ProductsInfo /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "", element: <Home /> },
    ],
  },

  {
    path: "/panel/*",
    element: <Index />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "chat", element: <Chat /> },
      { path: "financial", element: <Financial /> },
      { path: "comments", element: <Comments /> },
    ],
  },
];

export default route;
