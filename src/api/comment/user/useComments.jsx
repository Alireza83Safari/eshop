import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useComments = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", productId],
    queryFn: async () => {
      const { data } = await userAxios.get(`/comment/product/${productId}`);
      return data?.data;
    },
  });
  return { data, isLoading };
};

export default useComments;
