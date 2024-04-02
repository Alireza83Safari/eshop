import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useBanner = () => {
  const { data: banners, isLoading: bannersLoading } = useQuery({
    queryKey: ["appPic"],
    queryFn: async () => {
      const { data } = await userAxios.get(`/appPic`);
      return data;
    },
  });

  return { banners, bannersLoading };
};

export default useBanner;
