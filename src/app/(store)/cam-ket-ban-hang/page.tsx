import SaleCommitment from "@/containers/store/sale-commitment/view";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cam kết bán hàng",
};
const Page = () => {
  return <SaleCommitment />;
};

export default Page;
