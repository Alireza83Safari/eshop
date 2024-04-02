import { useMutation } from "@tanstack/react-query";
import userAxios from "../../services/Axios/userInterceptors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const {
    mutate: registerHandler,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (userInfo) => {
      const response = await userAxios.post(`register`, userInfo);
      return response?.data;
    },
    onSuccess: () => {
      toast.success("register is successfully");
      navigate("/login");
    },
  });

  return { isPending, registerHandler, error };
};

export default useRegister;
