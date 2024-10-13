import { useAuthStore } from "@/store";

const BASE_API = import.meta.env.VITE_BASE_API;

interface Props {
  type?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: unknown;
  id?: string | null;
}

const QueryApi = async ({ type = "GET", url = "", data = null, id = null }: Props) => {
  const token = useAuthStore.getState().token;
  const URL = id ? `${BASE_API}/${url}/${id}` : `${BASE_API}/${url}`;

  const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      token ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4MzI0Njc0LCJleHAiOjE3Mjg0OTc0NzR9.tXTUochaNF9juqkHlglQkq1PAQEQ9D2W63y0tLffgPU"
    }`,
  };

  const PARAMS: RequestInit = {
    method: type,
    headers: HEADERS,
  };

  if (type === "POST" || type === "PUT" || type === "PATCH") {
    PARAMS.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(URL, PARAMS);

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export default QueryApi;
