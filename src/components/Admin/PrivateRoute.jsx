import React, { useContext } from "react";
import productsContext from "../../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { adminIsLogin } = useContext(productsContext);
  return <>{adminIsLogin ? children : <h1>You Havent Access Here</h1>}</>;
}
