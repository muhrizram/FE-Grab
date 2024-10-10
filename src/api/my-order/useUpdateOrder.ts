import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ApiCUDResponseInterface } from "../../interfaces/MenuInterface";
import { UpdateOrderPayload } from "../../interfaces/MyOrderInterface";
import { apiApp } from "../apiApp";

const useUpdateOrder = (
  props?: UseMutationOptions<
    ApiCUDResponseInterface,
    Error,
    UpdateOrderPayload,
    unknown
  >
) => {
  const updateOrderFn = async (payload: UpdateOrderPayload) => {
    try {
      const response = await apiApp.put<ApiCUDResponseInterface>(
        `/transaction/update`,
        payload
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating order");
    }
  };
  return useMutation({
    mutationFn: updateOrderFn,
    mutationKey: ["update-order"],
    ...props,
  });
};

export default useUpdateOrder;
