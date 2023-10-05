import { createContext, useCallback, useEffect, useState } from "react";
import userAxios from "../services/Axios/userInterceptors";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userInfos, setUserInfos] = useState(null);
  const [userIsLogin, setUserIsLogin] = useState(null);
  const [showShopSidebar, setShowShopSidebar] = useState(false);
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
  return (
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
      {children}
    </AuthContext.Provider>
  );
};


