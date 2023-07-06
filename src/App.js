import { useRoutes } from "react-router-dom";
import "./App.css";
import route from "./routes/routes";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import ProductsContext from "./Context/productsContext";

function App() {
  const [getProducts, setProducts] = useState([]);
  const routes = useRoutes(route);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (!mode) {
      localStorage.theme = "light";
    } else if(mode) {
      localStorage.theme = "dark";
    }
    /*  */
  }, [mode]);

  const getAllProducts = () => {
    fetch("http://localhost:9000/products/")
      .then((res) => res.json())
      .then((products) => setProducts(products));
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
        }}
      >
        <Header />
        {routes}
        <Sidebar />
      </ProductsContext.Provider>
    </div>
  );
}

export default App;
