"use client";

import { getAbout } from "@/actions/aboutApi";
import Breadcrumb from "@/components/UI/breadcrumb";
import { SK_Box } from "@/components/UI/skeleton";
import Slider from "@/components/UI/slider";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function AboutView() {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);
  const [banner, setBanner] = useState<any[]>([]);

  const fetchApi = async () => {
    try {
      let listBanner: any = [];
      // GET CATEGORY
      const getLocales = getCookie("i18next");
      const aboutResponse = await getAbout(slug, getLocales);
      setData(aboutResponse.payload?.data?.[0] || null);
      if (aboutResponse.payload?.data[0]?.banner) {
        aboutResponse.payload?.data[0]?.banner.map?.((item: any) => {
          listBanner.push({
            id: item.id || "",
            image: { url: item?.url || "" },
          });
        });
      }

      setBanner(listBanner);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [slug]);

  return (
    <div className={styles.container}>
      {banner.length > 0 ? (
        <Slider data={banner} />
      ) : (
        <React.Fragment>
          <div className={styles.loadingBanner}>
            <SK_Box width="100%" height="500px" />
          </div>
        </React.Fragment>
      )}
      {data ? <Breadcrumb slug={data?.title || ""} /> : <div />}
      <div className="storeContainer">
        {data ? (
          <div
            className={`${styles.content} ck-content`}
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
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
    </div>
  );
}
export default AboutView;
