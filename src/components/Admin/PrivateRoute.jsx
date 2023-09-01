import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import productsContext from "../../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { adminIsLogin } = useContext(productsContext);
  return <>{adminIsLogin ? children : <h1>You Havent Access Here</h1>}</>;
}
