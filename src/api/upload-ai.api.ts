/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store";

const BASE_API = import.meta.env.VITE_BASE_API;

export const UploadDocumentAI = async (data: any) => {
    const token = useAuthStore.getState().token;
    const URL = `${BASE_API}/upload`;
    
    const HEADERS = {
      Authorization: `Bearer ${
        token ??
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4MzI0Njc0LCJleHAiOjE3Mjg0OTc0NzR9.tXTUochaNF9juqkHlglQkq1PAQEQ9D2W63y0tLffgPU"
      }`,
    };
  
    const PARAMS: RequestInit = {
      method: "POST",
      headers: HEADERS,
    };
  
    try {
      const response = await fetch(URL, { ...PARAMS, body: data });
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };