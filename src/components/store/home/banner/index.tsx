"use client";

import Button from "@/components/UI/button";
import { CONFIG } from "@/config-global";
import { useTranslate } from "@/locales";
import { dataThumbnail } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
interface IProps {
  data: any[];
}
const Banner: React.FC<IProps> = (props: IProps) => {
  const { data = [] } = props || {};
  const [category, setCategory] = useState<any[]>([]);
  const { t } = useTranslate("all");
  const handleDataCate = () => {
    if (data.length > 0) {
      setCategory(data);
    } else {
      setCategory(dataThumbnail);
    }
  };

  useEffect(() => {
    handleDataCate();
  }, [data]);

  const renderBanner = (item: any, index: number) => {
    const coverUrl = item?.cover?.url;
    const imageSrc = coverUrl
      ? `${CONFIG.assetsDir}${coverUrl}`
      : "/images/no-image.png";
    return (
      <div className={styles.wraperBanner} key={index}>
        <div className={styles.bannerImage}>
          <Image
            src={imageSrc}
            alt="banner"
            fill
            sizes="100vw"
            priority
            className={styles.imageBanner}
          />
        </div>
        <Link href={`/${item.slug}`}>
          <Button
            text={t("home.button.forHer")}
            backgroundColor={index === 1 ? "#ffe066" : "#DD2D7D"}
          />
        </Link>
      </div>
    );
  };
  return <>{category.map((item, index) => renderBanner(item, index))}</>;
};
export default Banner;
