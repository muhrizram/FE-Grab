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
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const { data } = useInfiniteListMenu();

  const [foodItems, setFoodItems] = useState<Menu[]>([]);

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
        id: "916d3d90-bd36-4e9f-9153-187e8d7e1bde",
        fullName: "John Doe",
      },
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
