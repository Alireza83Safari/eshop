import "./App.css";
import route from "./routes/routes";
import { useEffect, useState } from "react";
import ProductsContext from "./Context/productsContext";
import { useRoutes } from "react-router-dom";

function App() {
  const [getProducts, setProducts] = useState([]);
  const routes = useRoutes(route);
  const [mode, setMode] = useState(false);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
  const [checkOut, setCheckOut] = useState([]);
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

  const getAllProducts = () => {
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="App">
      <ProductsContext.Provider
        value={{
          getAllProducts,
          getProducts,
          setProducts,
          mode,
          setMode,
          showShopSidebar,
          setShowShopSidebar,
          checkOut,
          setCheckOut,
        }}
      >
        {routes}
      </ProductsContext.Provider>
    </div>
  );
}
export default App;
