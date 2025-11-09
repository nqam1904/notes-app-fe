"use client";
import { useTranslate } from "@/locales";
import styles from "./styles.module.scss";

function RefundPolicy() {
  const { t } = useTranslate("all");
  return (
    <div className={`${styles.container} storeContainer`}>
        <h1>{t("refundPolicy.page.title")}</h1>

        <h2>{t("refundPolicy.cancelOrder.title")}</h2>

        <p>{t("refundPolicy.cancelOrder.description")}</p>

        <p>
          <b>{t("refundPolicy.cancelOrder.timeTitle")}</b>
        </p>

        <ul>
          <li>{t("refundPolicy.cancelOrder.timeFastDelivery")}</li>
          <li>{t("refundPolicy.cancelOrder.timeOtherOrders")}</li>
        </ul>

        <h3>{t("returnPolicy.title")}</h3>

        <p>
          <b>{t("returnPolicy.timeTitle")}</b>
        </p>
        <p>{t("returnPolicy.timeDescription")}</p>

        <p>
          <b>{t("returnPolicy.requestTitle")}</b>
        </p>
        <p>{t("returnPolicy.requestDescription")}</p>

        <p>
          <b>{t("returnPolicy.conditionsTitle")}</b>
        </p>
        <ul>
          <li>{t("returnPolicy.condition1")}</li>
          <li>{t("returnPolicy.condition2")}</li>
          <li>{t("returnPolicy.condition3")}</li>
        </ul>

        <p className={styles.highlight}>{t("returnPolicy.note")}</p>

        <h3>{t("refundPolicy.title")}</h3>

        <ul>
          <li>{t("refundPolicy.successfulPayment")}</li>
          <li>{t("refundPolicy.faultyProduct")}</li>
          <li>{t("refundPolicy.refundTime")}</li>
        </ul>

        <p className={styles.note}>
          <b>{t("refundPolicy.noteTitle")}</b>{" "}
          {t("refundPolicy.noteDescription")}
        </p>
    </div>
  );
}
export default RefundPolicy;
