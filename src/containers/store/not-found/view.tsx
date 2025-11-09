import Footer from "@/components/store/footer";
import StoreNavBar from "@/components/store/navbar";
import Button from "@/components/UI/button";
import Link from "next/link";
import styles from "./styles.module.scss";

function NotFoundView() {
  return (
    <main>
      <StoreNavBar />
      <div className={styles.section}>
        <h1 className={styles.error}>404</h1>
        <div className={styles.page}>
          Đã có lỗi xảy ra!!! Trang bạn đang truy cập không tồn tại
        </div>
        <Link href="/">
          <Button text="Về trang chủ" />
        </Link>
      </div>
      <Footer />
    </main>
  );
}
export default NotFoundView;
