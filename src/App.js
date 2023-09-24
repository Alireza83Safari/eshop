import { useEffect, useState, useCallback } from "react";
import { useRoutes } from "react-router-dom";
import route from "./routes/routes";
import "./App.css";
import AuthContext from "./Context/AuthContext";
import userAxios from "./services/Axios/userInterceptors";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "./Context/ThemeContext";

function App() {
  const routes = useRoutes(route);
  const [userIsLogin, setUserIsLogin] = useState(null);
  const [mode, setMode] = useState(null);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
  const [userInfos, setUserInfos] = useState(null);

  const userLogin = useCallback(() => {
    userAxios.get("/is_authenticated").then((res) => {
      if (res.status === 200) {
        setUserInfos(res?.data);
        setUserIsLogin(true);
      }
    });
  }, []);

  useEffect(() => {
    userLogin();
  }, []);

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
    <div className="App max-w-[1400px] sm:mx-auto relative w-full min-w-full">
      <AuthContext.Provider
        value={{
          showShopSidebar,
          setShowShopSidebar,
          userIsLogin,
          userInfos,
          userLogin,
          setUserIsLogin,
        }}
      >
        <ThemeContext.Provider value={{ mode, setMode }}>
          {routes}
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
