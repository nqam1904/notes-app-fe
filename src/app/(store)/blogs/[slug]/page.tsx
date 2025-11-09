import { getBlogDetail } from "@/actions/blogsApi";
import BlogsDetailView from "@/containers/store/blog/blog-detail/view";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const getLanguages = cookieStore.get("i18next");
  const { payload } = await getBlogDetail(params?.slug, getLanguages?.value);
  if (!payload.data && payload.data?.length === 0) {
    return {
      title: "Không tìm thấy bài viết!",
    };
  }

  return {
    title: `${payload?.data?.[0]?.title}`,
  };
}

async function BlogsDetailPage() {
  return <BlogsDetailView />;
}

export default BlogsDetailPage;
