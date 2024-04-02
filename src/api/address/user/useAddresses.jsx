import { useQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useAddresses = () => {
  const { data: addresses, isLoading: addressesLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await userAxios.get(`/address`);
      return data;
    },
  });

  return { addresses, addressesLoading };
};

export default useAddresses;
