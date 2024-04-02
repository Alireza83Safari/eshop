import { useMutation } from "@tanstack/react-query";
import userAxios from "../../services/Axios/userInterceptors";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    mutate: loginHandler,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (userInfo) => {
      const response = await userAxios.post(`login`, userInfo);
      return response?.data;
    },
    onSuccess: () => {
      toast.success("login is successfully");
      navigate("/");
    },
  });

  return { isPending, loginHandler, isSuccess };
};

export default useLogin;
