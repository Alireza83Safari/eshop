import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useOrders = () => {
  const {
    refetch: getOrders,
    data: orders,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await userAxios.get(`profile/orders`);
      return data;
    },
  });
  return { orders, isLoading, getOrders };
};

export default useOrders;
