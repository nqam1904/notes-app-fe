"use client";

import { useTranslate } from "@/locales";
import styles from "./styles.module.scss";

function SaleCommitment() {
  const { t } = useTranslate("all");
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>{t("sales.commitment.title")}</h1>
      <p>
        {t("sales.commitment.content")} <strong>{t("app.name")}</strong>
      </p>
      <ul>
        <li>{t("sales.commitment.content1")}</li>
        <li>{t("sales.commitment.content2")}</li>
        <li>{t("sales.commitment.content3")}</li>
      </ul>
    </div>
  );
}
export default SaleCommitment;
