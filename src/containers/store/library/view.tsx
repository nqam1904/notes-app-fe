"use client";

import { getBanner } from "@/actions/bannerApi";
import Breadcrumb from "@/components/UI/breadcrumb";
import { SK_Box } from "@/components/UI/skeleton";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function LibraryView() {
  const [banner, setBanner] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  const fetchApi = async () => {
    try {
      const { payload } = await getBanner();
      const dataSlider: any[] = payload.data || [];
      setBanner(dataSlider);
      await fetch("https://wp.pigina.com.vn/wp-json/wp/v2/pages/7")
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className={styles.container}>
      <Breadcrumb slug="Thư viện" />
      <div className="storeContainer">
        {data ? (
          <div style={{ width: "100%" }}>
            <div
              className="elementor elementor-7 elementor-kit-6 elementor-page elementor-page-7"
              dangerouslySetInnerHTML={{ __html: data.content?.rendered }}
            />
          </div>
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
export default LibraryView;
