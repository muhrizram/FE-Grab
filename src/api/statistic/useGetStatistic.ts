import { useQuery } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { StatisticResponse } from "../../interfaces/Type";

const useGetStatistic = () => {
  const getStatisticFn = async () => {
    console.log("Fetching statistic...");
    try {
      const response = await apiApp.get<StatisticResponse>("/statistic");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching statistic:", error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["statistic"],
    queryFn: getStatisticFn,
  });
};

export default useGetStatistic;
