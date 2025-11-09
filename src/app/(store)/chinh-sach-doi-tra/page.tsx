import RefundPolicy from "@/containers/store/refund-policy/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách đổi/trả hàng và hoàn tiền",
};
const Page = () => {
  return <RefundPolicy />;
};

export default Page;
