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

interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

interface MenuContextType {
  foodItems: FoodItem[];
  foodId: string[];
  handleSubmit: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const { data } = useInfiniteListMenu();

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const [foodId, setFoodId] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const newItems = data.pages.flatMap((page) => page);
      setFoodItems(newItems);
    }
  }, [data]);

  const { data: dataOrder } = useInfiniteListOrderByPax({
    id: "916d3d90-bd36-4e9f-9153-187e8d7e1bde",
  });

  useEffect(() => {
    if (dataOrder) {
      const orderIds = dataOrder.pages.flatMap((page) =>
        page.map((order) => order.menuId)
      );
      setFoodId(orderIds);
    }
  }, [dataOrder]);

  const { mutate: mutateCreate } = useCreateOrder({
    onSuccess: (data) => {
      setFoodId((prevFoodId) => [...prevFoodId, data.data.menuId]);
      toast.success("Berhasil memesan menu");
    },
    onError: () => {
      toast.error("Gagal memesan menu");
    },
  });

  const handleSubmit = (id: string) => {
    const payload = {
      menuId: id,
      paxId: "916d3d90-bd36-4e9f-9153-187e8d7e1bde",
      status: "on going",
    };
    return mutateCreate(payload);
  };

  return (
    <MenuContext.Provider value={{ foodItems, foodId, handleSubmit }}>
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
