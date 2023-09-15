import React, { useContext } from "react";
import productsContext from "../../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { userIsLogin } = useContext(productsContext);
  return <>{userIsLogin ? children : <h1>You Havent Access Here</h1>}</>;
}
