import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiCUDResponseInterface } from "../../interfaces/MenuInterface";

interface UseGetOrderByIdProps {
  id: string;
}

const useGetOrderById = ({ id }: UseGetOrderByIdProps) => {
  const getOrderByIdFn = async () => {
    try {
      const response = await apiApp.get<ApiCUDResponseInterface>(
        `/transaction/detail/${id}`
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching statistic:", error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["get-order-by-id", id],
    queryFn: getOrderByIdFn,
  });
};

export default useGetOrderById;
