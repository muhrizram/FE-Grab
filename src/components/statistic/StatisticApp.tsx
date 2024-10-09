import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useStatisticContext } from "../../providers/StatisticProvider";
import LineChartComp from "../LineChartComp";

const StatisticApp = () => {
  const { data } = useStatisticContext();
  return (
    <div>
      <Sidebar>
        <Typography variant="h4" mb="30px" component="h1" fontWeight="bold">
          Statistic Order per Month
        </Typography>
        <Box sx={{ width: "100%", height: "400px", padding: "20px" }}>
          <LineChartComp data={data} />
        </Box>
      </Sidebar>
    </div>
  );
};

export default StatisticApp;
