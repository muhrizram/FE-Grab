import { Box, Typography } from "@mui/material";
import { useHistoryOrderContext } from "../../providers/HistoryOrderProvider";
import CustomTable from "../CustomTable";
import DataNotFound from "../my-order/DataNotFound";
import Sidebar from "../Sidebar";

const HistoryOrderApp = () => {
  const { columns, data, totalData, page, setPage, limit, setLimit } =
    useHistoryOrderContext();
  return (
    <Sidebar>
      <Typography variant="h4" mb="30px" component="h1" fontWeight="bold">
        History Order
      </Typography>
      {data.length > 0 ? (
        <CustomTable
          columns={columns}
          data={data}
          totalData={totalData}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      ) : (
        <DataNotFound />
      )}
    </Sidebar>
  );
};

export default HistoryOrderApp;
