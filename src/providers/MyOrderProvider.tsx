import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Column } from "../interfaces/TableInterface";
import useInfiniteListOrderByPax from "../api/menu/useInfiniteListOrderByPax";
import { Box, Button } from "@mui/material";
import { toast } from "sonner";
import { CUDResponse } from "../interfaces/MenuInterface";
import useUpdateOrder from "../api/my-order/useUpdateOrder";

interface MenuTable {
  menu: string;
  price: string;
  action: ReactNode;
}

interface MyOrderContextType {
  columns: Column<MenuTable>[];
  data: MenuTable[];
  totalData: number;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const MyOrderContext = createContext<MyOrderContextType | undefined>(undefined);

interface MyOrderProviderProps {
  children: ReactNode;
}

export const MyOrderProvider: React.FC<MyOrderProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { data: dataOrder, refetch } = useInfiniteListOrderByPax({
    id: "95a3bcb1-2148-4ff4-ad8b-d989817243d5",
    page: page,
    limit: limit,
  });

  const [myOrder, setMyOrder] = useState<MenuTable[]>([]);

  const { mutate: mutateUpdate } = useUpdateOrder({
    onSuccess: () => {
      toast.success("Order dimasukkan ke History");
      refetch();
    },
    onError: () => {
      toast.error("Gagal merubah status Order");
    },
  });

  const handleEditOrder = (status: string, order: CUDResponse) => {
    const payload = {
      id: order.id,
      paxId: order.pax.id,
      menuId: order.menu.id,
      status: status,
    };
    mutateUpdate(payload);
  };

  useEffect(() => {
    if (dataOrder) {
      const newOrder = dataOrder.pages.flatMap((page) =>
        page.data.map((order: CUDResponse) => ({
          menu: order.menu.name,
          price: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(order.menu.price)),
          action: (
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={() => {
                  handleEditOrder("canceled", order);
                }}
                sx={{
                  backgroundColor: "#F05A7E",
                  color: "white",
                  "&:hover": { backgroundColor: "#ff3333" },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleEditOrder("completed", order);
                }}
                sx={{
                  backgroundColor: "#0B8494",
                  color: "white",
                  "&:hover": { backgroundColor: "#006600" },
                }}
              >
                Complete
              </Button>
            </Box>
          ),
        }))
      );
      setMyOrder(newOrder);
    }
  }, [dataOrder]);

  const totalData = dataOrder?.pages[0]?.totalData || 0;

  const columns: Column<MenuTable>[] = [
    { id: "menu", label: "Menu" },
    { id: "price", label: "Price" },
    { id: "action", label: "Action" },
  ];

  return (
    <MyOrderContext.Provider
      value={{
        columns,
        data: myOrder,
        totalData,
        page,
        setPage,
        limit,
        setLimit,
      }}
    >
      {children}
    </MyOrderContext.Provider>
  );
};

export const useMyOrderContext = (): MyOrderContextType => {
  const context = useContext(MyOrderContext);
  if (!context) {
    throw new Error(
      "useMyOrderContext harus digunakan di dalam MyOrderProvider"
    );
  }
  return context;
};
