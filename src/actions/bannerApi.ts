import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getBanner() {
  return http.get<any>(`${endpoints.banner}`);
}
