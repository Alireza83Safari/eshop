import { useLocation, useRoutes } from "react-router-dom";
import route from "./routes/routes";
import "./App.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const routes = useRoutes(route);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (showAlert) {
      alert(
        "جهت دسترسی به پنل مدیریت با این اکانت وارد شوید =>  admin1  password= Aa@123456"
      );
      setShowAlert(false);
    }
  }, [showAlert]);

  return (
    <div className="App max-w-[1400px] sm:mx-auto relative w-full min-w-full">
      <ThemeContextProvider>
        <AuthContextProvider>{routes}</AuthContextProvider>
      </ThemeContextProvider>
      <Toaster />
    </div>
  );
}
export default App;
