import { createContext, ReactNode, useContext } from "react";

interface HistoryOrderContextType {}

const HistoryOrderContext = createContext<HistoryOrderContextType | undefined>(
  undefined
);

interface HistoryOrderProps {
  children: ReactNode;
}
export const HistoryOrderProvider: React.FC<HistoryOrderProps> = ({
  children,
}) => {
  return (
    <HistoryOrderContext.Provider value={{}}></HistoryOrderContext.Provider>
  );
};

export const useHistoryOrderContext = () => {
  const context = useContext(HistoryOrderContext);
  if (!context) {
    throw new Error(
      "useHistoryOrderContext must be used within a HistoryOrderProvider"
    );
  }
};
