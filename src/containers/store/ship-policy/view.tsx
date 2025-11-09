"use client";
import { useTranslate } from "@/locales";
import styles from "./styles.module.scss";

function ShipPolicy() {
  const { t } = useTranslate("all");
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>{t("shippingPolicy.title")}</h1>

      <h2>{t("shippingPolicy.ship")}</h2>
      <p>1. {t("shippingPolicy.ship.content1")}</p>
      <p>
        2. <b>{t("shippingPolicy.ship.content2")}</b>
      </p>

      <table>
        <thead>
          <tr>
            <th>{t("shippingPolicy.table.method")}</th>
            <th>{t("shippingPolicy.table.details")}</th>
            <th>{t("shippingPolicy.table.fee")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>{t("shippingPolicy.table.expressDelivery")}</b> <br />
              {t("shippingPolicy.table.expressNote")}
            </td>
            <td>{t("shippingPolicy.table.expressDetails")}</td>
            <td>
              <b>{t("shippingPolicy.table.expressFee")}</b> <br />
              {t("shippingPolicy.table.expressFeeNote")}
            </td>
          </tr>
          <tr>
            <td>
              <b>{t("shippingPolicy.table.standardDelivery")}</b>
            </td>
            <td>
              {t("shippingPolicy.table.standardDetails")}
              <br />
              {t("shippingPolicy.table.standardDetails1")}
              <br />
              {t("shippingPolicy.table.standardDetails2")}
            </td>

            <td>
              {t("shippingPolicy.table.standardFee")}
              <b>{t("shippingPolicy.table.standardFee.price")}</b>
            </td>
          </tr>
        </tbody>
      </table>

      <p className={styles.note}>
        <b>{t("shippingPolicy.note.title")}</b>{" "}
        {t("shippingPolicy.note.description")}
      </p>
    </div>
  );
}
export default ShipPolicy;
