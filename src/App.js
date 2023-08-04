import "./App.css";
import route from "./routes/routes";
import { useEffect, useState } from "react";
import ProductsContext from "./Context/productsContext";
import { useNavigate, useRoutes } from "react-router-dom";
import AuthContext from "./Context/productsContext";

function App() {
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [getProducts, setProducts] = useState([]);
  const routes = useRoutes(route);
  const [mode, setMode] = useState(false);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
  const [brand, setBrand] = useState([]);
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

  const getCategory = () => {
    setIsLoading(true);
    fetch("/api/v1/category", {
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((cate) => {
        setCategory(cate);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setIsLoading(false);
      });
  };

  const getBrand = () => {
    fetch("/api/v1/brand", {
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setBrand(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getOrder = () => {
    fetch("/api/v1/order", {
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setOrders(result.items);
      });
  };

  const getAllProducts = () => {
    setIsLoading(true);
    fetch("api/v1/product", {
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((products) => {
        setProducts(products.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const login = (user, token) => {
    setUserInfos(user.username);
    setToken(token);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  useEffect(() => {
    //Call getAllProducts
    getAllProducts();

    //Call Brandd
    getBrand();

    getOrder();

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
      getCategory();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App max-w-[1400px] mx-auto relative w-full min-w-full">
      <AuthContext.Provider
        value={{
          token,
          userInfos,
          login,
        }}
      >
        <ProductsContext.Provider
          value={{
            getProducts,
            setProducts,
            mode,
            setMode,
            showShopSidebar,
            setShowShopSidebar,
            brand,
            login,
            setUserInfos,
            category,
            isLoading,
            setIsLoading,
            token,
            orders,
            getAllProducts,
            getOrder,
          }}
        >
          {routes}
        </ProductsContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
