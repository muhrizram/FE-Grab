import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useInfiniteListHistoryOrder from "../api/history-order/useInfiniteListHistoryOrder";
import { Column } from "../interfaces/TableInterface";
import { CUDResponse } from "../interfaces/MenuInterface";
import { Chip } from "@mui/material";

interface HistoryOrderProps {
  children: ReactNode;
}

interface HistoryOrderTable {
  pax: string;
  menu: string;
  price: string;
  status: ReactNode;
}

interface HistoryOrderContextType {
  columns: Column<HistoryOrderTable>[];
  data: HistoryOrderTable[];
  totalData: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const HistoryOrderContext = createContext<HistoryOrderContextType | undefined>(
  undefined
);

export const HistoryOrderProvider: React.FC<HistoryOrderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [historyOrder, setHistoryOrder] = useState<HistoryOrderTable[]>([]);
  const { data: dataHistoryOrder } = useInfiniteListHistoryOrder({
    page: page,
    limit: limit,
  });

  const columns: Column<HistoryOrderTable>[] = [
    { id: "pax", label: "Pax" },
    { id: "menu", label: "Menu" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
  ];

  useEffect(() => {
    if (dataHistoryOrder) {
      const newOrder = dataHistoryOrder.pages.flatMap((page) =>
        page.data.map((order: CUDResponse) => ({
          pax: order.pax.fullName,
          menu: order.menu.name,
          price: new Intl.NumberFormat("id-ID", {
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
