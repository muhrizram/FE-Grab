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
import useGetOrderById from "../api/my-order/useGetOrderById";

interface MenuTable {
  id: string;
  "menu.name": string;
  "menu.price": string;
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
  search: string;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sort: string;
  direction: string;
  handleSorting: (column: string, sort: string) => void;
  handleRowClick: (row: MenuTable) => void;
  open: boolean;
  handleClose: () => void;
  orderDetail: OrderDetail | undefined;
}

type OrderDetail = {
  id: string;
  fullName: string;
  menuName: string;
  menuPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const MyOrderContext = createContext<MyOrderContextType | undefined>(undefined);

interface MyOrderProviderProps {
  children: ReactNode;
}

export const MyOrderProvider: React.FC<MyOrderProviderProps> = ({
  children,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<string>("");
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();
  const { data: dataOrder, refetch } = useInfiniteListOrderByPax({
    id: "95a3bcb1-2148-4ff4-ad8b-d989817243d5",
    page: page,
    limit: limit,
    search: search,
    sortBy: sort,
    direction: direction,
  });

  const [myOrder, setMyOrder] = useState<MenuTable[]>([]);

  const { mutate: mutateUpdate, isPending } = useUpdateOrder({
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
          id: order.id,
          "menu.name": order.menu.name,
          "menu.price": new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(order.menu.price)),
          action: (
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                disabled={isPending}
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
                disabled={isPending}
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
    { id: "menu.name", label: "Menu", sortable: true },
    { id: "menu.price", label: "Price", sortable: true },
    { id: "action", label: "Action" },
  ];

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleSorting = (sort: string, direction: string) => {
    setSort(sort);
    setDirection(direction);
  };

  const handleRowClick = (row: MenuTable) => {
    setDetailId(row.id);
    setOpen(true);
  };

  const { data: dataDetail } = useGetOrderById({ id: detailId });

  useEffect(() => {
    if (dataDetail) {
      if (Array.isArray(dataDetail)) {
        console.log("Data is empty");
      } else {
        setOrderDetail({
          id: dataDetail.data.id,
          fullName: dataDetail.data.pax.fullName,
          menuName: dataDetail.data.menu.name,
          menuPrice: new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Number(dataDetail.data.menu.price)),
          status: dataDetail.data.status,
          createdAt: dataDetail.data.createdAt,
          updatedAt: dataDetail.data.updatedAt,
        });
      }
    }
  }, [dataDetail]);

  const handleClose = () => {
    setOpen(false);
  };

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
        search,
        handleChangeSearch,
        sort,
        direction,
        handleSorting,
        handleRowClick,
        open,
        orderDetail,
        handleClose,
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
