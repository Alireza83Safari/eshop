import { useLocation, useRoutes } from "react-router-dom";
import route from "./routes/routes";
import "./App.css";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const routes = useRoutes(route);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App max-w-[1400px] sm:mx-auto relative w-full min-w-full">
      <Toaster />
      <ThemeContextProvider>
        <AuthContextProvider>{routes}</AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}
export default App;
