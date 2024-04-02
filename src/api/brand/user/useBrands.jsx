import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useBrands = () => {
  let total;
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const data = await userAxios.get("brand", {});
      return data?.data;
    },
    select: (data) => {
      total = data?.total;
      return data?.data;
    },
  });

  return { data, isLoading, total };
};

export default useBrands;
