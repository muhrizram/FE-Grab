import { useInfiniteQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiListInterface } from "../../interfaces/ApiListInterface";

const useInfiniteListMenu = () => {
  const getListMenuFn = async ({ pageParam = 0 }: { pageParam?: number }) => {
    console.log("Fetching data with pageParam:", pageParam);
    try {
      const response = await apiApp.get<ApiListInterface>("/menu");

      console.log("Response data:", response.data);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching list menu:", error);
      return []; // Mengembalikan array kosong untuk mencegah crash
    }
  };

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["list-menu"],
    queryFn: getListMenuFn,
    getNextPageParam(lastPage, allPages) {
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  console.log("Infinite query:", infiniteQuery); // Tambahkan log ini

  return { ...infiniteQuery };
};

export default useInfiniteListMenu;
