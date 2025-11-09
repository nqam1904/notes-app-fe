import { getAbout } from "@/actions/aboutApi";
import { CONFIG } from "@/config-global";
import AboutView from "@/containers/store/about/view";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const getLanguages = cookieStore.get("i18next");
  const { payload } = await getAbout(params.slug || "", getLanguages?.value);
  if (payload.data.length === 0) {
    return {
      title: "Không tìm thấy tiêu đề!",
    };
  }
  return {
    title: `${payload.data[0]?.title || ""} ${CONFIG.appName}`,
  };
}
function AboutPage() {
  return <AboutView />;
}

export default AboutPage;
