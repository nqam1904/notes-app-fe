import { InformationIcon } from "@/components/icons/svgIcons";
import { CONFIG } from "@/config-global";
import { useTranslate } from "@/locales";
import { ItemProductProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tooltip } from "react-tooltip";
import Button from "../button";
import styles from "./styles.module.scss";

function ItemProduct(props: ItemProductProps) {
  const { image = [], title, slug = "", tooltip, badge } = props || {};
  const { t } = useTranslate("all");

  return (
    <div className={styles.product}>
      <>
        {badge ? (
          <span className={styles.badgeProduct}>{badge}</span>
        ) : (
          <React.Fragment />
        )}

        <div className={styles.wrapperImage}>
          <Image
            alt="image_product"
            src={`${CONFIG.assetsDir}${image?.[0]?.url}`}
            width={0}
            height={0}
            sizes="(max-width:256px)"
            priority
            draggable={false}
            className={styles.productImage}
          />
        </div>
        <div className={styles.wrapperName}>
          <Link href={`/san-pham/${slug}`} className={styles.productName}>
            {title}
          </Link>
          <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content={tooltip}
            data-tooltip-variant="error"
          >
            <InformationIcon width={24} />
          </a>
          <Tooltip
            id="my-tooltip"
            style={{
              backgroundColor: "#007aff",
              color: "#FFFFFF",
              width: "100%",
            }}
          />
        </div>
        <div className={styles.flexRow}></div>
      </>
      <Link href={`/san-pham/${slug}`}>
        <Button
          text={t("home.category.button.seeMore")}
          className={styles.productButton}
        />
      </Link>
    </div>
  );
}
export default ItemProduct;
