import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getReview(languages: any) {
  return http.get<any>(`${endpoints.review}&locale=${languages || "vi"}`);
}
