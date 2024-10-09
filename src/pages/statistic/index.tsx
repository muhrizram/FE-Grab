import StatisticApp from "../../components/statistic/StatisticApp";
import { StatisticProvider } from "../../providers/StatisticProvider";

const Statistic = () => {
  return (
    <StatisticProvider>
      <StatisticApp />
    </StatisticProvider>
  );
};

export default Statistic;
