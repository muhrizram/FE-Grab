import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { apiApp } from "../apiApp";
import { LoginPayload, LoginResponse } from "../../interfaces/MenuInterface";

const usePostLogin = (
  props?: UseMutationOptions<LoginResponse, Error, LoginPayload, unknown>
) => {
  const postLoginFn = async (payload: LoginPayload) => {
    try {
      const response = await apiApp.post<LoginResponse>(`/login`, payload);

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error login");
    }
  };

  return useMutation({
    mutationFn: postLoginFn,
    mutationKey: ["post-login"],
    ...props,
  });
};

export default usePostLogin;
