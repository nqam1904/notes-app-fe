import { CONFIG } from "@/config-global";
import NotFoundView from "@/containers/store/not-found/view";

export const metadata = {
  title: `Không tìm thấy! | Error - ${CONFIG.appName}`,
};

export default function Page() {
  return <NotFoundView />;
}
