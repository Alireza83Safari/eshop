import { useInfiniteQuery } from "@tanstack/react-query";
import userAxios from "../../../services/Axios/userInterceptors";
import { useSearchParams } from "react-router-dom";

const useProducts = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const searchTerm = searchParams.get("searchTerm");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    total,
  } = useInfiniteQuery({
    queryKey: ["products", { categoryId, brandId, order, searchTerm }],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await userAxios.get("product", {
        params: {
          page: pageParam,
          limit: 12,
          categoryId,
          brandId,
          order,
          searchTerm,
        },
      });
      return response?.data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 < lastPage?.last_page
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

export default useProducts;
