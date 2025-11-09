import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export async function getListProduct() {
  return http.get<any>(`${endpoints.products}`);
}
export async function getProductBySlug(slug: string, languages: any) {
  return http.get<any>(`${endpoints.products}&filters[slug]=${slug}&locale=${
    languages || "vi"
  }
`);
}
export async function getProductByCategory(name: string, languages: any) {
  return http.get<any>(
    `${endpoints.products}&filters[category][title]=${name}&locale=${
      languages || "vi"
    }`
  );
}
