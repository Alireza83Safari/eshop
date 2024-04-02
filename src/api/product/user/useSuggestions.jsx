import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useSuggestions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["suggestionss"],
    queryFn: async () => {
      const response = await userAxios.get("product/suggestions");
      return response?.data?.data;
    },
  });
  return { data, isLoading };
};

export default useSuggestions;
