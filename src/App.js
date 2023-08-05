import "./App.css";
import route from "./routes/routes";
import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsContext from "./Context/productsContext";
import useFetch from "./hooks/useFetch";

function App() {
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [getProducts, setProducts] = useState([]);
  const routes = useRoutes(route);
  const [mode, setMode] = useState(false);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const { datas: productsData } = useFetch("/api/v1/product");
  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  const login = (user, token) => {
    setUserInfos(user.username);
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  // Function to check if the token has expired
  const isTokenExpired = () => {
    const tokenExpiresAt = new Date(userInfos.expiresAt).getTime();
    return Date.now() >= tokenExpiresAt;
  };

  // Function to clear the token from localStorage and reset state
  const clearToken = () => {
    setUserInfos({});
    setToken(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setMode(true);
    } else {
      setMode(false);
    }
    // user is login ?
    const userToken = JSON.parse(localStorage.getItem("user"))?.token;
    if (userToken) {
      setToken(userToken);
    } else {
      navigate("/login");
    }

    // Check if the token is expired when the component mounts
    if (isTokenExpired()) {
      clearToken();
    }

    // Set up a timer to periodically check if the token is expired
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        clearToken();
      }
    };

    const tokenCheckInterval = setInterval(checkTokenExpiration, 6000); // Check every minute

    // Clean up the timer when the component unmounts
    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <div className="App max-w-[1400px] mx-auto relative w-full min-w-full">
      <ProductsContext.Provider
        value={{
          getProducts,
          mode,
          setMode,
          showShopSidebar,
          setShowShopSidebar,
          login,
          setUserInfos,
          token,
        }}
      >
        {routes}
      </ProductsContext.Provider>
    </div>
  );
}
export default App;
