import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiListInterface, CUDResponse } from "../../interfaces/MenuInterface";

interface UseInfiniteListOrderByPaxProps {
  id: string;
  search?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  direction?: string;
}

interface ListOrderResponse {
  data: CUDResponse[];
  totalData: number;
}

const useInfiniteListOrderByPax = ({
  id,
  search,
  limit,
  sortBy,
  direction,
  page,
}: UseInfiniteListOrderByPaxProps) => {
  const getListOrderFn = async () => {
    const params: Record<string, any> = {
      page: page,
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
      return {
        data: response.data.data || [],
        totalData: response.data.totalData || 0,
      };
    } catch (error) {
      console.error("Error fetching list orders:", error);
      return { data: [], totalData: 0 };
    }
  };

  const infiniteQuery = useInfiniteQuery<ListOrderResponse>({
    queryKey: ["list-orders", id, search, limit, sortBy, direction, page],
    queryFn: getListOrderFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.data.length > 0 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
  return { ...infiniteQuery };
};

export default useInfiniteListOrderByPax;
