import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiListInterface, Menu } from "../../interfaces/MenuInterface";

interface ListMenuResponse {
  data: Menu[];
  totalPage: number;
}

const useInfiniteListMenu = ({ page = 0 }: { page?: number } = {}) => {
  const getListMenuFn = async () => {
    console.log("Fetching list menu...");
    try {
      const response = await apiApp.get<ApiListInterface>("/menu", {
        params: { page },
      });
      return {
        data: response.data.data || [],
        totalPage: response.data.totalPage || 0,
      };
    } catch (error) {
      console.error("Error fetching list menu:", error);
      return { data: [], totalPage: 0 };
    }
  };

  const infiniteQuery = useInfiniteQuery<ListMenuResponse>({
    queryKey: ["list-menu", page],
    queryFn: getListMenuFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.data.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return { ...infiniteQuery };
};

export default useInfiniteListMenu;
