import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const { mutate: addToFavorite, isSuccess } = useMutation({
    mutationFn: async (itemId) => {
      const response = await userAxios.post(`/favoriteProductItem`, {
        productItemId: itemId,
      });
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`add favorite product successfully`);
      queryClient.invalidateQueries("favorites");
    },
  });

  return { addToFavorite, isSuccess };
};

export default useAddFavorite;
