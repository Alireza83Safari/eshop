import React, { useContext, useMemo } from "react";
import { AuthContext } from "../Context/AuthContext";

function useAccess(permissions) {
  const { userPermissions } = useContext(AuthContext);

  const userHaveAccess = useMemo(() => {
    return userPermissions?.some((item) => item === permissions);
  }, [permissions, userPermissions]);
  return { userHaveAccess };
}

export default useAccess;
