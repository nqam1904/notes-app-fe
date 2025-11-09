import Button from "@/components/UI/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

const ComingSoon: React.FC = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tính năng đang phát triển!</h1>
        <Image
          src="/images/new_logo.png"
          alt="not found"
          width={400}
          height={200}
          style={{ objectFit: "contain", alignSelf: "center" }}
        />
        <Button text="Về trang chủ" onClick={() => router.push("/")} />
      </div>
    </div>
  );
};
export default ComingSoon;
