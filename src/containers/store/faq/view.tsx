"use client";

import Breadcrumb from "@/components/UI/breadcrumb";
import Slider from "@/components/UI/slider";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

import { Chevron } from "@/components/icons/svgIcons";
import { SK_Box } from "@/components/UI/skeleton";
import { useTranslate } from "@/locales";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";

type FaqViewProps = {
  data: any[];
  banner: any[];
};

function FaqView(props: FaqViewProps) {
  const { data, banner } = props || {};
  const { t } = useTranslate("all");
  const [dataFaq, setDataFaq] = useState<any[]>([]);

  const faqDataSize = useMemo(() => {
    return dataFaq.length;
  }, []);

  const generateHeaderClass = useCallback(
    (open: any, position: any) => {
      const background = open
        ? styles.backgroundActive
        : styles.backgroundWhite;
      const border =
        position === faqDataSize
          ? open
            ? styles.accordionBody
            : ""
          : styles.accordionBody;
      return `${styles.accordionHeaderContainer} ${border} ${background}`;
    },
    [faqDataSize]
  );

  const generateBodyClass = useCallback(
    (open: any, position: any) => {
      return position === faqDataSize ? "" : open ? styles.accordionBody : "";
    },
    [faqDataSize]
  );

  useEffect(() => {
    setDataFaq(data);
  }, []);

  return (
    <div className={styles.container}>
      <Slider data={banner} />
      <Breadcrumb slug={t("breadcrumb.faq")} />
      <div className="storeContainer">
        {dataFaq.length > 0 ? (
          <Accordion className={styles.accordionContainer}>
            {dataFaq.map((item, index) => {
              return (
                <AccordionItem key={index}>
                  {({ open }: any) => (
                    <>
                      <AccordionHeader
                        className={generateHeaderClass(open, index + 1)}
                      >
                        <span className={styles.title}>{item?.question}</span>

                        <Chevron
                          className={`${styles.iconChevron} ${
                            open ? styles.iconRotate : ""
                          }`}
                        />
                      </AccordionHeader>

                      <AccordionBody
                        className={generateBodyClass(open, index + 1)}
                      >
                        <div
                          className={`${styles.textBody} ck-content`}
                          dangerouslySetInnerHTML={{
                            __html: item?.answer || "",
                          }}
                        />
                      </AccordionBody>
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </Accordion>
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
export default FaqView;
