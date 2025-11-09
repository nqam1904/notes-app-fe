/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import styles from "./productBoard.module.scss";

const ProductBoard = ({ boardData }: any) => {
  const { title, introduction, category } = boardData;
  return (
    <div className={styles.productBoard}>
      <h1>{title}</h1>
      <span
        className={`${styles.shortDesc} ck-content`}
        dangerouslySetInnerHTML={{ __html: introduction }}
      ></span>
      <p className={styles.category}>
        Danh mục: <Link href={"/"}>{category?.title || ""}</Link>
      </p>
      <hr />
    </div>
  );
};

export default ProductBoard;
