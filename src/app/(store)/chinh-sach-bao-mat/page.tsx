import PrivacyPolicy from "@/containers/store/privacy-policy/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
};
const Page = () => {
  return <PrivacyPolicy />;
};

export default Page;
