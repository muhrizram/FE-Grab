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
        <h1>My Order</h1>
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
