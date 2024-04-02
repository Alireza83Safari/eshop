import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createComment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (comment) => {
      const response = await userAxios.post(`/comment`, comment);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`create comment successfully`);
      queryClient.invalidateQueries(["comments", "myComments"]);
    },
  });

  return { isPending, createComment, isSuccess };
};

export default useCreateComment;
