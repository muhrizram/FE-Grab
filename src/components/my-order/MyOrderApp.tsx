import { Typography } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import Sidebar from "../../components/Sidebar";
import { useMyOrderContext } from "../../providers/MyOrderProvider";
import DataNotFound from "./DataNotFound";

const MyOrderApp = () => {
  const { columns, data, totalData, page, setPage, limit, setLimit } =
    useMyOrderContext();
  return (
    <div>
      <Sidebar>
        <Typography variant="h4" mb="30px" component="h1" fontWeight="bold">
          My Order
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
    </div>
  );
};

export default MyOrderApp;
