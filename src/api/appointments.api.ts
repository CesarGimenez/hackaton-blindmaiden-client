import QueryApi from "./useQueryApi";

export const CreateAppointmentAPI = async (data: unknown) => await QueryApi({ url: "appointments", type: "POST", data });
export const UpdateStatusAppintmentsAPI = async (data: unknown, id: string) => await QueryApi({ url: "appointments", type: "PATCH", data, id });

export const GetMyAppoinments = async (id: string) => await QueryApi({ url: "appointments/myappointments", id });