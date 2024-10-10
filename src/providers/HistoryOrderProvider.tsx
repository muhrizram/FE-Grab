import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useInfiniteListHistoryOrder from "../api/history-order/useInfiniteListHistoryOrder";
import { Column, HistoryOrderTable } from "../interfaces/TableInterface";
import { CUDResponse } from "../interfaces/MenuInterface";
import { Chip } from "@mui/material";

interface HistoryOrderProps {
  children: ReactNode;
}

interface HistoryOrderContextType {
  columns: Column<HistoryOrderTable>[];
  data: HistoryOrderTable[];
  totalData: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  search: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sort: string;
  direction: string;
  handleSorting: (column: string, sort: string) => void;
}

const HistoryOrderContext = createContext<HistoryOrderContextType | undefined>(
  undefined
);

export const HistoryOrderProvider: React.FC<HistoryOrderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [historyOrder, setHistoryOrder] = useState<HistoryOrderTable[]>([]);
  const { data: dataHistoryOrder } = useInfiniteListHistoryOrder({
    page: page,
    limit: limit,
    search: search,
    sortBy: sort,
    direction: direction,
  });

  const columns: Column<HistoryOrderTable>[] = [
    { id: "pax.fullName", label: "Pax", sortable: true },
    { id: "menu.name", label: "Menu", sortable: true },
    { id: "menu.price", label: "Price", sortable: true },
    { id: "status", label: "Status" },
  ];

  useEffect(() => {
    if (dataHistoryOrder) {
      const newOrder = dataHistoryOrder.pages.flatMap((page) =>
        page.data.map((order: CUDResponse) => ({
          number: order.id,
          "pax.fullName": order.pax.fullName,
          "menu.name": order.menu.name,
          "menu.price": new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(order.menu.price)),
          status: (
            <Chip
              label={order.status}
              style={{
                backgroundColor:
                  order.status === "completed"
                    ? "#125B9A"
                    : order.status === "canceled"
                    ? "#F05A7E"
                    : "default",
                color: "white",
              }}
            />
          ),
        }))
      );
      setHistoryOrder(newOrder);
    }
  }, [dataHistoryOrder]);

  const totalData = dataHistoryOrder?.pages[0]?.totalData || 0;

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleSorting = (sort: string, direction: string) => {
    setSort(sort);
    setDirection(direction);
  };

  return (
    <HistoryOrderContext.Provider
      value={{
        columns,
        data: historyOrder,
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
      }}
    >
      {children}
    </HistoryOrderContext.Provider>
  );
};

export const useHistoryOrderContext = () => {
  const context = useContext(HistoryOrderContext);
  if (!context) {
    throw new Error(
      "useHistoryOrderContext must be used within a HistoryOrderProvider"
    );
  }
  return context;
};
