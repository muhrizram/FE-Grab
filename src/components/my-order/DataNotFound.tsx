import { Box } from "@mui/material";
import dataNotFound from "../../assets/image/datanotfound.png";

const DataNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={dataNotFound} alt="Data Not Found" width={"500px"}></img>
    </Box>
  );
};

export default DataNotFound;
