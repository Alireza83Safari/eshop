import { useState } from "react";
import userAxios from "../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useRemove = () => {
  const [isLoading, setIsLoading] = useState(false);

  const removeHandler = async (url, id, callback) => {
    setIsLoading(true);

    try {
      const response = await userAxios.post(`${url}/${id}`);
      if (response.status === 200) {
        toast.success(`deleted!`, {
          position: "bottom-right",
        });
        setIsLoading(false);
        callback();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { removeHandler, isLoading };
};
export default useRemove;
