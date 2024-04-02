import { useQuery } from "@tanstack/react-query";

const useFetch = (url, customInstance, key) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", key],
    queryFn: async () => {
      const response = await customInstance.get(url);
      return response?.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export default useFetch;
