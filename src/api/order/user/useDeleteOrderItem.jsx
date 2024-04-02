import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOrderItem, isPending } = useMutation({
    mutationFn: async (orderItemId) => {
      const response = await userAxios.post(`/orderItem/delete/${orderItemId}`);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`delete orderItem successfully`);
      queryClient.invalidateQueries("orderItems");
    },
  });

  return { isPending, deleteOrderItem };
};

export default useDeleteOrderItem;
