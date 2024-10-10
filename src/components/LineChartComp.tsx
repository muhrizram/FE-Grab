import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FC } from "react";

interface LineChartCompProps {
  data: Array<{ month: string; completed: number; canceled: number }>;
}

const LineChartComp: FC<LineChartCompProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#00C49F"
          name="Completed"
        />
        <Line
          type="monotone"
          dataKey="canceled"
          stroke="#FF8042"
          name="Canceled"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;
