import { getProductBySlug } from "@/actions/productApi";
import { CONFIG } from "@/config-global";
import ProductView from "@/containers/store/product/view";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
  }): Promise<Metadata> {
  const cookieStore = await cookies();
  const getLanguages = cookieStore.get("i18next");
  const { payload } = await getProductBySlug(params?.slug, getLanguages?.value);
  if (!payload && payload.data.length === 0) {
    return {
      title: "Không tìm thấy sản phẩm!",
    };
  }
  return {
    title: `${payload?.data?.[0]?.name || ""} ${CONFIG.appName}`,
  };
}
async function ProductPage() {
  return <ProductView />;
}

export default ProductPage;
