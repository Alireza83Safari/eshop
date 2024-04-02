import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteAddress,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (address) => {
      const response = await userAxios.post(`/address/delete/${address}`);
      return response?.data;
    },
    onSuccess: () => {
      toast.success(`delete address successfully`);
      queryClient.invalidateQueries("addresses");
    },
  });

  return { isPending, deleteAddress, isSuccess, error };
};

export default useDeleteAddress;
