import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useMyComments = () => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["myComments"],
    queryFn: async () => {
      const { data } = await userAxios.get(`/comment`);
      return data?.data;
    },
  });
  return { comments, isLoading };
};

export default useMyComments;
