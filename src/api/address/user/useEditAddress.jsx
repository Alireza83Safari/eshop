import { useMutation, useQueryClient } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useEditAddress = () => {
  const queryClient = useQueryClient();
  const {
    mutate: editAddress,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ addressId, address }) => {
      const { data } = await userAxios.post(
        `/address/edit/${addressId}`,
        address
      );
      return data;
    },
    onSuccess: () => {
      toast.success(`edit address successfully`);
      queryClient.invalidateQueries("addresses");
    },
  });

  return { isPending, editAddress, isSuccess, error };
};

export default useEditAddress;
