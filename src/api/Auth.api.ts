import QueryApi from "./useQueryApi";

export const login = async (data: unknown) => await QueryApi({ url: "auth/login", type: "POST", data });
export const signUp = async (data: unknown) => await QueryApi({ url: "auth/signup", type: "POST", data });