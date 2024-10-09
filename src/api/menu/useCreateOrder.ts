import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { ApiCUDResponseInterface, CreateOrderPayload } from "../../interfaces/MenuInterface";

const useCreateOrder = (
  props?: UseMutationOptions<ApiCUDResponseInterface, Error, CreateOrderPayload, unknown>
) => {
  const createOrderFn = async (payload: CreateOrderPayload) => {
    console.log("create order...")
    try {
      const response = await apiApp.post<ApiCUDResponseInterface>(
        `/transaction/create`,
        payload
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating order");
    }
  };

  return useMutation({
    mutationFn: createOrderFn,
    mutationKey: ["create-order"],
    ...props,
  });
};

export default useCreateOrder;
