import { CONFIG } from "@/config-global";
import { DataBlogs } from "@/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ItemProps extends DataBlogs {}

const ItemSlideBlog: React.FC<ItemProps> = ({
  title = "",
  slug = "",
  banner = [],
}) => {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className={styles.container}>
        <div className={styles.slideItem}>
          <div className={styles.slideImage}>
            <Image
              alt="thumbnail"
              width={0}
              height={0}
              sizes="100vw"
              priority
              src={`${CONFIG.assetsDir}${banner?.[0]?.url}`}
              className={styles.thumbnailItem}
            />
            <p className={styles.slideTitle}>{title}</p>
            <p
              className={styles.slideShort}
              dangerouslySetInnerHTML={{ __html: "" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ItemSlideBlog;
