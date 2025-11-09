import ShipPolicy from "@/containers/store/ship-policy/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách vận chuyển",
};

const Page = () => {
  return <ShipPolicy />;
};

export default Page;
