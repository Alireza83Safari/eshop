import { useMutation } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useAddress = () => {
  const {
    mutate: getAddress,
    data: address,
    isPending,
  } = useMutation({
    mutationFn: async (addressId) => {
      const { data } = await userAxios.get(`address/${addressId}`);
      return data;
    },
  });
  return { address, isPending, getAddress };
};

export default useAddress;
