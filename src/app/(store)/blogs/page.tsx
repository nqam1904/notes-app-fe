import { getBlog } from "@/actions/blogsApi";
import BlogsView from "@/containers/store/blog/view";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Tin tức sự kiện",
};

async function BlogsPage() {
  const cookieStore = await cookies();
  const getLanguages = cookieStore.get("i18next");
  const { payload } = await getBlog("news", getLanguages?.value);
  if (!payload?.data) {
    notFound();
  }
  return <BlogsView dataNews={payload?.data} />;
}

export default BlogsPage;
