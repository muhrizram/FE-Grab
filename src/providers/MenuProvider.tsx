import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useInfiniteListMenu from "../api/menu/useInfiniteListMenu";
import useCreateOrder from "../api/menu/useCreateOrder";
import useInfiniteListOrderByPax from "../api/menu/useInfiniteListOrderByPax";
import { toast } from "sonner";
import { Menu } from "../interfaces/MenuInterface";

interface MenuContextType {
  foodItems: Menu[];
  foodId: string[];
  handleSubmit: (food: Menu) => void;
  page: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const { data } = useInfiniteListMenu({ page: page - 1 });

  const totalPages = data?.pages[0]?.totalPage || 0;

  const [foodItems, setFoodItems] = useState<Menu[]>([]);

  const [foodId, setFoodId] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const newItems = data.pages.flatMap((page) =>
        page.data.map((item) => item)
      );
      setFoodItems(newItems);
    }
  }, [data]);

  const { data: dataOrder } = useInfiniteListOrderByPax({
    id: "95a3bcb1-2148-4ff4-ad8b-d989817243d5",
  });

  useEffect(() => {
    if (dataOrder) {
      const orderIds = dataOrder.pages.flatMap((page) =>
        page.data.map((order) => order.menu.id)
      );
      setFoodId(orderIds);
    }
  }, [dataOrder]);

  const { mutate: mutateCreate } = useCreateOrder({
    onSuccess: (data) => {
      setFoodId((prevFoodId) => [...prevFoodId, data.data.menu.id]);
      toast.success("Berhasil memesan menu");
    },
    onError: () => {
      toast.error("Gagal memesan menu");
    },
  });

  const handleSubmit = (food: Menu) => {
    const payload = {
      menu: {
        id: food.id,
        name: food.name,
        price: food.price,
      },
      pax: {
        id: "95a3bcb1-2148-4ff4-ad8b-d989817243d5",
        fullName: "coba",
      },
      status: "on going",
    };
    return mutateCreate(payload);
  };

  return (
    <MenuContext.Provider
      value={{
        foodItems,
        foodId,
        handleSubmit,
        page,
        handlePageChange,
        totalPages,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext harus digunakan di dalam MenuProvider");
  }
  return context;
};
