'use client';
import { useTranslate } from "@/locales";
import styles from "./styles.module.scss";

function PrivacyPolicy() {
  const {t} = useTranslate("all");
    return (
      <div className={`${styles.container} storeContainer`}>
        <h1>{t("privacyPolicy.title")}</h1>
        <p>{t("privacyPolicy.intro")}</p>
        <ul>
          <li>{t("privacyPolicy.order")}</li>
          <li>{t("privacyPolicy.account")}</li>
          <li>{t("privacyPolicy.personalization")}</li>
        </ul>
        <p>{t("privacyPolicy.improveExperience")}</p>
        <p>{t("privacyPolicy.improveServices")}</p>
        <p>{t("privacyPolicy.personalizedAds")}</p>
      </div>
    );
}
export default PrivacyPolicy