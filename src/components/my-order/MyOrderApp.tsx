import {
  Box,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import Sidebar from "../../components/Sidebar";
import { useMyOrderContext } from "../../providers/MyOrderProvider";
import DataNotFound from "../DataNotFound";
import { Search } from "@mui/icons-material";
import { dateFormat, timeFormat } from "../../utils/timeAndDate";

const MyOrderApp = () => {
  const {
    columns,
    data,
    totalData,
    page,
    setPage,
    limit,
    setLimit,
    search,
    handleChangeSearch,
    sort,
    direction,
    handleSorting,
    handleRowClick,
    open,
    orderDetail,
    handleClose,
  } = useMyOrderContext();
  return (
    <div>
      <Sidebar>
        <Typography variant="h4" mb="30px" component="h1" fontWeight="bold">
          My Order
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            mb: "20px",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={search}
            onChange={handleChangeSearch}
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              maxWidth: 200,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "darkgreen",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green",
                },
              },
            }}
          />
        </Box>
        {data.length > 0 ? (
          <CustomTable
            columns={columns}
            data={data}
            totalData={totalData}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            sort={sort}
            direction={direction}
            handleSorting={handleSorting}
            isClickable={true}
            handleRowClick={handleRowClick}
          />
        ) : (
          <DataNotFound />
        )}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Detail Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              {orderDetail && (
                <>
                  <Typography>
                    <strong>Pax:</strong> {orderDetail.fullName}
                  </Typography>
                  <Typography>
                    <strong>Menu:</strong> {orderDetail.menuName}
                  </Typography>
                  <Typography>
                    <strong>Price:</strong> {orderDetail.menuPrice}
                  </Typography>
                  <Typography>
                    <strong>Created At:</strong>
                  </Typography>
                  <Typography>
                    Date : {dateFormat(orderDetail.createdAt)}
                  </Typography>
                  <Typography>
                    Time: {timeFormat(orderDetail.createdAt)}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Modal>
      </Sidebar>
    </div>
  );
};

export default MyOrderApp;
