import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import axios from "axios";
import route from "./routes/routes";
import "./App.css";
import AuthContext from "./Context/AuthContext";
import userAxios from "./services/Axios/userInterceptors";

function App() {
  const routes = useRoutes(route);
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [adminIsLogin, setAdminIsLogin] = useState(false);
  const [mode, setMode] = useState(false);
  const [showShopSidebar, setShowShopSidebar] = useState(false);

  const userLogin = () => {
    userAxios.get("/is_authenticated").then((res) => {
      if (res.status === 200) {
        setUserIsLogin(true);
      }
    });
  };

  const adminLogin = () => {
    axios.get("/api/v1/admin/is_authenticated").then((res) => {
      if (res.status === 200) {
        setAdminIsLogin(true);
      }
    });
  };

  useEffect(() => {
    userLogin();
  }, [userIsLogin]);

  useEffect(() => {
    adminLogin();
  }, [adminIsLogin]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setMode(true);
    } else {
      setMode(false);
    }
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="App max-w-[1400px] mx-auto relative w-full min-w-full">
      <AuthContext.Provider
        value={{
          mode,
          setMode,
          showShopSidebar,
          setShowShopSidebar,
          userIsLogin,
          adminIsLogin,
          userLogin,
        }}
      >
        {routes}
      </AuthContext.Provider>
    </div>
  );
}
export default App;
