import QueryApi from "./useQueryApi";

export const GetUsersApi = async () => await QueryApi({ url: "user" });
export const CreateUserApi = async (data: unknown) => await QueryApi({ url: "user", type: "POST", data });
export const UpdateUserApi = async (data: unknown, id: string) => await QueryApi({ url: "user", type: "PATCH", data, id });
export const DeleteUserApi = async (id: string) => await QueryApi({ url: "user", type: "DELETE", id });

export const GetUserDoctorsApi = async () => await QueryApi({ url: "user/doctors" });

export const GetMyInfoApi = async (id: string) => await QueryApi({ url: "user/my-info", id });