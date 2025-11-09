import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getAbout(slug: string, languages: any) {
  return http.get<any>(`${endpoints.abouts}&filters[slug]=${slug}&locale=${languages || 'vi'}`);
}
