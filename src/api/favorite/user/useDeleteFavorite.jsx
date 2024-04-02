import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteFavorite, isSuccess } = useMutation({
    mutationFn: async (addressId) => {
      const response = await userAxios.post(
        `/favoriteProductItem/delete/${addressId}`
      );
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`delete favorite product successfully`);
      queryClient.invalidateQueries("favorites");
    },
  });

  return { deleteFavorite, isSuccess };
};

export default useDeleteFavorite;
