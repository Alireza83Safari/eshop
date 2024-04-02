import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const useCreateOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: createOrder,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (addressId) => {
      const response = await userAxios.post(`/order/checkout/${addressId}`);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`create order successfully`);
      navigate("/");
      queryClient.invalidateQueries("orders");
    },
  });

  return { isPending, createOrder, isSuccess };
};

export default useCreateOrder;
