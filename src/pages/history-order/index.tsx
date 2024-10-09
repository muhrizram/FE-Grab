import HistoryOrderApp from "../../components/history-order/HistoryOrderApp";
import { HistoryOrderProvider } from "../../providers/HistoryOrderProvider";

const HistoryOrder = () => {
  return (
    <HistoryOrderProvider>
      <HistoryOrderApp />
    </HistoryOrderProvider>
  );
};

export default HistoryOrder;
