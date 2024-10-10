import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useHistoryOrderContext } from "../../providers/HistoryOrderProvider";
import CustomTable from "../CustomTable";
import DataNotFound from "../DataNotFound";
import Sidebar from "../Sidebar";
import { Search } from "@mui/icons-material";

const HistoryOrderApp = () => {
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
  } = useHistoryOrderContext();
  return (
    <Sidebar>
      <Typography variant="h4" component="h1" fontWeight="bold">
        History Order
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
        />
      ) : (
        <DataNotFound />
      )}
    </Sidebar>
  );
};

export default HistoryOrderApp;
