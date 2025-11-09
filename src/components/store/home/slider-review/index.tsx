"use client";

import { getReview } from "@/actions/reviewApi";
import Rating from "@/components/UI/rating";
import { SK_Box } from "@/components/UI/skeleton";
import { CONFIG } from "@/config-global";
import { useTranslate } from "@/locales";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./styles.module.scss";

const SliderReview: React.FC = () => {
  const { t } = useTranslate("all");

  // Function to strip HTML tags
  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };
  const [data, setData] = useState<any>([]);
  const getLocales = getCookie("i18next");

  const fetchData = async () => {
    try {
      const { payload } = await getReview(getLocales);
      setData(payload?.data || []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getLocales]);

  const renderReview = () => {
    return data.map((item: any, index: number) => {
      return (
        <div className={styles.item} key={index}>
          <div className={styles.headerItem}>
            <Image
              src={`${CONFIG.assetsDir}${item?.avatar?.url}`}
              alt="avatar"
              width={50}
              height={50}
              priority
              className={styles.avatar}
            />
            <div className={styles.rightHeader}>
              <span className={styles.name}>{item?.fullName || ""}</span>
              <Rating rating={5} />
              <span className={styles.occupation}>
                {getLocales === "en"
                  ? item?.occupation || ""
                  : `${item?.age || 0} tuổi - ${item?.occupation || ""}`}
              </span>
            </div>
            <Link
              className={styles.icFace}
              href={item?.social || ""}
              target="_blank"
            >
              <Image
                src={"/images/ic_facebook.png"}
                alt="facebook"
                width={24}
                height={24}
              />
            </Link>
          </div>
          {/* testimonal */}
          <div className={styles.bodyItem}>
            <div className={styles.testimonial}>
              {stripHtmlTags(item?.review || "")}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("customer.title")}</h2>
      {data.length > 0 ? (
        <Slider {...settings}>{renderReview()}</Slider>
      ) : (
        <React.Fragment>
          <div className={styles.loading}>
            <SK_Box width="100%" height="16px" />
            <SK_Box width="100%" height="16px" />
            <SK_Box width="100%" height="16px" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default SliderReview;
