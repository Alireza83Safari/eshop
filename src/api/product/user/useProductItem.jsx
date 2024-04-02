import { useMutation } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useProductItem = () => {
  const {
    mutate: getProductItem,
    data: productItem,
    isPending,
  } = useMutation({
    mutationFn: async (itemId) => {
      const { data } = await userAxios.get(`productItem/${itemId}`);
      return data;
    },
  });
  return { productItem, isPending, getProductItem };
};

export default useProductItem;
