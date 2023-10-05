import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { userIsLogin } = useContext(AuthContext);
  return <>{userIsLogin ? children : <h1>You Havent Access Here</h1>}</>;
}
