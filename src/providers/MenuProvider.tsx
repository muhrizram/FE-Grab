import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import useInfiniteListMenu from "../api/menu/useInfiniteListMenu";

interface FoodItem {
  name: string;
  image: string;
  description: string;
  price: string;
}

interface MenuContextType {
  foodItems: FoodItem[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const { data } = useInfiniteListMenu();

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (data) {
      const newItems = data.pages.flatMap((page) => page);
      setFoodItems(newItems);
    }
  }, [data]);

  return (
    <MenuContext.Provider value={{ foodItems }}>
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
