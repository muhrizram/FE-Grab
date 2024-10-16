import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Box,
} from "@mui/material";
import { Column } from "../interfaces/TableInterface";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalData: number;
  rowsPerPageOptions?: number[];
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  sort?: string;
  direction?: string;
  handleSorting?: (column: string, sort: string) => void;
  isClickable?: boolean;
  handleRowClick?: (row: T) => void;
}

const CustomTable = <T,>({
  columns,
  data,
  totalData,
  page,
  setPage,
  limit,
  setLimit,
  sort,
  direction,
  handleSorting,
  isClickable = false,
  handleRowClick = () => {},
  rowsPerPageOptions = [10, 25, 50],
}: ReusableTableProps<T>) => {
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={String(column.id)}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {column.label}
                      {column.sortable && (
                        <IconButton size="small">
                          {direction === "asc" && sort === column.id ? (
                            <KeyboardArrowDown
                              fontSize="small"
                              onClick={() =>
                                handleSorting &&
                                handleSorting(String(column.id), "desc")
                              }
                            />
                          ) : (
                            <KeyboardArrowUp
                              fontSize="small"
                              onClick={() =>
                                handleSorting &&
                                handleSorting(String(column.id), "asc")
                              }
                            />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  style={{
                    cursor: isClickable ? "pointer" : "default",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    if (isClickable)
                      e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.08)";
                  }}
                  onMouseOut={(e) => {
                    if (isClickable)
                      e.currentTarget.style.backgroundColor = "white";
                  }}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {row[column.id] as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalData}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CustomTable;
