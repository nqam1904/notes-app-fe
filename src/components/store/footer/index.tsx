"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import { useTranslate } from "@/locales";

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslate("all");
  
  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInfo}>
          <h3 className={styles.footerTitle}>{t("footer.title")}</h3>
          <div className={styles.footerLine} />
          <p>
            Hotline:{" "}
            {isMobile ? (
              <Link style={{ color: "#007aff" }} href="tel:0967900107">
                0967900107
              </Link>
            ) : (
              `0967900107`
            )}
          </p>
          <p>
            Website:{" "}
            <a href="https://pigina.com.vn" target="_blank">
              https://pigina.vn
            </a>
          </p>
          <p>{t("footer.address")}</p>
          <p>{t("footer.business.certification")}</p>
          <p>{t("footer.department.planning")}</p>
          <Image
            src="/images/bo-cong-thuong.png"
            alt="Bộ Công Thương"
            width={150}
            height={60}
            style={{ marginLeft: "-12px" }}
          />
        </div>
        <div className={styles.footerSocial}>
          <div className={styles.wraperLogo}>
            <Link href={"/"}>
              <Image
                src="/images/new_logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className={styles.logoFooter}
              />
            </Link>
            <div className={styles.listSocial}>
              <Link
                href={"https://www.facebook.com/piginakoreavn"}
                target="_blank"
              >
                <Image
                  src="/images/icons/facebook-icon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className={styles.icon}
                />
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCQAgdkLq_WUyJa8vi7PQBqw"
                }
                target="_blank"
              >
                <Image
                  src="/images/icons/youtube-icon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className={styles.icon}
                />
              </Link>
              <Link
                href={"https://www.instagram.com/pigina.korea"}
                target="_blank"
              >
                <Image
                  src="/images/icons/instagram-icon.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className={styles.icon}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className={styles.policies}>
          <Link href="/cam-ket-ban-hang">
            {t("footer.links.saleCommitment")}
          </Link>
          <Link href="/chinh-sach-bao-mat">
            {t("footer.links.privacyPolicy")}
          </Link>
          <Link href="/chinh-sach-van-chuyen">
            {t("footer.links.shippingPolicy")}
          </Link>
          <Link href="/chinh-sach-doi-tra">
            {t("footer.links.returnPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
