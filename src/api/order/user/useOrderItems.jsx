import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useOrderItems = () => {
  const {
    refetch: getOrderItems,
    data: orderItems,
    isLoading,
  } = useQuery({
    queryKey: ["orderItems"],
    queryFn: async () => {
      const response = await userAxios.get(`order`);
      return response?.data;
    },
  });
  return { orderItems, isLoading, getOrderItems };
};

export default useOrderItems;
