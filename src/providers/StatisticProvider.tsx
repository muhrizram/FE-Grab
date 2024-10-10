import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useGetStatistic from "../api/statistic/useGetStatistic";
import { MonthData, StatisticResponse } from "../interfaces/type";

interface StatisticProps {
  children: ReactNode;
}

interface StatisticContextType {
  data: { month: string; completed: number; canceled: number }[];
}

const StatisticContext = createContext<StatisticContextType | undefined>(
  undefined
);

export const StatisticProvider: React.FC<StatisticProps> = ({ children }) => {
  const { data: dataStatistic } = useGetStatistic();
  const lineChart: MonthData[] = [];

  useEffect(() => {
    if (dataStatistic && !Array.isArray(dataStatistic)) {
      for (const year in dataStatistic as StatisticResponse) {
        const monthsData = (dataStatistic as StatisticResponse)[year];

        monthsData.forEach((monthData) => {
          const { month, completed, canceled } = monthData;

          lineChart.push({ month, completed, canceled });
        });
      }
    }
    setData(lineChart);
  }, [dataStatistic]);

  const [data, setData] = useState(lineChart);

  return (
    <StatisticContext.Provider value={{ data }}>
      {children}
    </StatisticContext.Provider>
  );
};

export const useStatisticContext = () => {
  const context = useContext(StatisticContext);
  if (!context) {
    throw new Error(
      "useStatisticContext must be used within a StatisticProvider"
    );
  }
  return context;
};
