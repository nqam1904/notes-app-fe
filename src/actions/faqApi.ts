import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getFaq(languages: any) {
  return http.get<any>(`${endpoints.faq}&locale=${languages || "vi"}
`);
}
