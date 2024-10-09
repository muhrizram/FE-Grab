import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiListInterface } from "../../interfaces/MenuInterface";

const useInfiniteListMenu = () => {
  const getListMenuFn = async () => {
    console.log("Fetching list menu...");
    try {
      const response = await apiApp.get<ApiListInterface>("/menu");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching list menu:", error);
      return []; 
    }
  };

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["list-menu"],
    queryFn: getListMenuFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { ...infiniteQuery };
};

export default useInfiniteListMenu;
