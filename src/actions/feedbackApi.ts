import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function submitFeedback(body:any) {
  return http.post(`${endpoints.createFeedback}`, body);
}
