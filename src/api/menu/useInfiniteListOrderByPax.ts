import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiListInterface } from "../../interfaces/MenuInterface";

interface UseInfiniteListOrderByPaxProps {
  id: string;
  search?: string;
  limit?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}

const useInfiniteListOrderByPax = ({
  id,
  search,
  limit,
  sortBy,
  direction,
}: UseInfiniteListOrderByPaxProps) => {
  const getListOrderFn = async ({ pageParam = 0 }: { pageParam?: number }) => {

    const params: Record<string, any> = {
      page: pageParam,
      ...(search && { search }),
      ...(limit && { limit }),
      ...(sortBy && { sortBy }),
      ...(direction && { direction }),
    };

    try {
      const response = await apiApp.get<ApiListInterface>(
        `/transaction/orders/${id}`,
        { params }
      );
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching list orders:", error);
      return []; 
    }
  };

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["list-orders", id, search, limit, sortBy, direction],
    queryFn: getListOrderFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.length > 0 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  return { ...infiniteQuery };
};

export default useInfiniteListOrderByPax;
