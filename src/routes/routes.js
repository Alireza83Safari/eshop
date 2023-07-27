import Index from "../components/Admin";
import Chat from "../pages/Admin/Chat";
import Comments from "../pages/Admin/Comments";
import Dashboard from "../pages/Admin/Dashboard";
import Financial from "../pages/Admin/Financial";
import Products from "../pages/Admin/Products";

const route = [
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
