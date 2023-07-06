import Chat from "../components/Chat";
import Comments from "../components/Comments/Comments";
import Dashboard from "../components/Dashboard/Dashboard";
import Financial from "../components/Financial/Financial";
import Products from "../components/Products/Products";

const route = [
  { path: "/", element: <Dashboard /> },
  { path: "/products", element: <Products /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/chat", element: <Chat /> },
  { path: "/financial", element: <Financial /> },
  { path: "/comments", element: <Comments /> },
];

export default route;
