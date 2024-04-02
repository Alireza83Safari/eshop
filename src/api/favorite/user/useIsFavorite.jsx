import { useMutation } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useIsFavorite = () => {
  const {
    mutate: isFavoriteHandler,
    isSuccess,
    data: isFavorite,
  } = useMutation({
    mutationFn: async (itemId) => {
      const { data } = await userAxios.get(
        `/favoriteProductItem/isFavorite/${itemId}`
      );
      return data;
    },
  });

  return { isFavoriteHandler, isSuccess, isFavorite };
};

export default useIsFavorite;
