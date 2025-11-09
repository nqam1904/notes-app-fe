import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getCateogry(slug: string, languages: any) {
  return http.get<any>(
    `${endpoints.categories}&filters[slug]=${slug}&locale=${languages || "vi"}`
  );
}

export async function getListCategory(languages: any) {
  return http.get<any>(`${endpoints.categories}&locale=${languages || "vi"}`);
}
