import LibraryView from "@/containers/store/library/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thư viện",
};

async function LibraryPage() {
  return <LibraryView />;
}
export default LibraryPage;
