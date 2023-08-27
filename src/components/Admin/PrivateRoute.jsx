import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import productsContext from "../../Context/productsContext";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { adminIsLogin } = useContext(productsContext);
  console.log(adminIsLogin);
  return <>{adminIsLogin ? children : navigate("/adminlogin")}</>;
}
