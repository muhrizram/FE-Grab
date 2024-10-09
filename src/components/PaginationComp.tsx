import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

interface PaginationCompProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_event, page) => onPageChange(page)}
      variant="outlined"
      shape="rounded"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            "&.Mui-selected": { backgroundColor: "#1976d2", color: "white" },
          }}
        />
      )}
    />
  );
};

export default PaginationComp;
