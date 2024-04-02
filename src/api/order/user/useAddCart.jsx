import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useAddCart = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addToCart,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (product) => {
      const response = await userAxios.post(`/orderItem`, product);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`product added to cart!`);
      queryClient.invalidateQueries("orderItems");
    },
  });

  return { isPending, addToCart, isSuccess };
};

export default useAddCart;
