import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createAddress,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (address) => {
      const response = await userAxios.post(`/address`, address);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`create address successfully`);
      queryClient.invalidateQueries("addresses");
    },
  });

  return { isPending, createAddress, isSuccess, error };
};

export default useCreateAddress;
