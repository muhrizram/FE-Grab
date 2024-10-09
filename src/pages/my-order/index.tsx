import MyOrderApp from "../../components/my-order/MyOrderApp";
import { MyOrderProvider } from "../../providers/MyOrderProvider";

const MyOrder = () => {
  return (
    <MyOrderProvider>
      <MyOrderApp />
    </MyOrderProvider>
  );
};

export default MyOrder;
