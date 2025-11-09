import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getBlog(type: string = "news", languages: any) {
  return http.get<any>(
    `${endpoints.blog}&filters[type]=${type}&locale=${languages || "vi"}`
  );
}

export async function getBlogDetail(slug: string, languages: any) {
  return http.get<any>(
    `${endpoints.blog}&filters[slug]=${slug}&locale=${languages || "vi"}`
  );
}
