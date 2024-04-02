import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useCategoriesList = () => {
  let total;
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await userAxios.get("category/selectList", {});
      return data?.data;
    },
    select: (data) => {
      total = data?.total;
      return data?.data;
    },
  });
  return { data, isLoading };
};

export default useCategoriesList;
