import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiListInterface, CUDResponse } from "../../interfaces/MenuInterface";
import { apiApp } from "../apiApp";

interface UseInfiniteListHistoryOrderProps {
  search?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
}
interface ListHistoryOrderResponse {
  data: CUDResponse[];
  totalData: number;
}
const useInfiniteListHistoryOrder = ({
  search,
  limit,
  sortBy,
  direction,
  page,
}: UseInfiniteListHistoryOrderProps) => {
  const getListHistoryorderFn = async () => {
    const params: Record<string, any> = {
      page: page,
      ...(search && { search }),
      ...(limit && { limit }),
      ...(sortBy && { sortBy }),
      ...(direction && { direction }),
    };
    try {
      const response = await apiApp.get<ApiListInterface>(`/history/orders`, {
        params,
      });
      return {
        data: response.data.data || [],
        totalData: response.data.totalData || 0,
      };
    } catch (error) {
      console.error("Error fetching list history orders:", error);
      return { data: [], totalData: 0 };
    }
  };
  const infiniteQuery = useInfiniteQuery<ListHistoryOrderResponse>({
    queryKey: ["list-history-orders", search, limit, sortBy, direction, page],
    queryFn: getListHistoryorderFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.data.length > 0 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
  return { ...infiniteQuery };
};

export default useInfiniteListHistoryOrder;
