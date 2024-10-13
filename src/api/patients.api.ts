import QueryApi from "./useQueryApi";

export const GetMyPatientsApi = async (id: string) => await QueryApi({ url: "user/my-patients", id });
export const GetInfoPatientApi = async (id: string) => await QueryApi({ url: "user/patient", id });
export const UpdateTreatmentApi = async (data: unknown, id: string) => await QueryApi({ url: "user/patient-treatment", type: "PATCH", id, data });
