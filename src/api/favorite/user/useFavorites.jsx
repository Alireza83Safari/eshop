import { useInfiniteQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";

const useFavorites = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    total,
  } = useInfiniteQuery({
    queryKey: ["favorites"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await userAxios.get(`profile/favoriteProducts`, {
        params: {
          page: pageParam,
          limit: 4,
        },
      });
      return response?.data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 <= lastPage?.last_page
        ? lastPage.page + 1
        : undefined;
    },

    select: (data) => {
      return data?.pages?.flatMap((data) => data.data);
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    total,
  };
};

export default useFavorites;
