"use client";
import { getProductByCategory, getProductBySlug } from "@/actions/productApi";
import Gallery from "@/components/store/product/gallery";
import ProductBoard from "@/components/store/product/productBoard";
import ItemProduct from "@/components/UI/item-product";
import { SK_Box } from "@/components/UI/skeleton";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function ProductView() {
  const { slug } = useParams<any>();
  const [product, setProduct] = useState<any>(null);
  const [listProduct, setListProduct] = useState<any[]>([]);

  const fetchApi = async () => {
    try {
      const getLocales = getCookie("i18next");
      const { payload } = await getProductBySlug(slug, getLocales);
      if (payload.data.length > 0) {
        setProduct(payload.data[0]);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    }
  };

  const getListProduct = async () => {
    try {
      const getLocales = getCookie("i18next");
      const { payload } = await getProductByCategory(
        product?.category?.title,
        getLocales
      );
      if (payload.data.length > 0) {
        setListProduct(payload.data);
      }
    } catch (error) {
      console.log(error);
      setListProduct([]);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [slug]);

  useEffect(() => {
    if (product) {
      getListProduct();
    }
  }, [product]);

  return (
    <div className="storeContainer">
      <div className={styles.productPage}>
        <BreadcrumbProduct category={product?.category} product={product} />
        {/* UPPER SECTION */}
        <div className={styles.upperSection}>
          <div className={styles.leftSection}>
            <Gallery images={product?.image} />
          </div>
          <div className={styles.rightSection}>
            {product ? (
              <ProductBoard
                boardData={{
                  title: product?.title || "",
                  introduction: product?.introduction || "",
                  category: product.category || "",
                }}
              />
            ) : (
              <div className={styles.boardLoading}>
                <SK_Box width="60%" height="14px" />
                <div className={styles.title}>
                  <SK_Box width="90%" height="16px" />
                </div>
                <div className={styles.desc}>
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                  <SK_Box width="40%" height="14px" />
                </div>
                <div className={styles.price}>
                  <SK_Box width="30%" height="40px" />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* LOWER SECTION */}
        <div className={styles.lowerSection}>
          <div className={styles.leftSection}>
            <div className={styles.specification}>
              <h2>Mô tả</h2>
              <div
                className={`${styles.contentDescription} ck-content`}
                dangerouslySetInnerHTML={{ __html: product?.description || "" }}
              />

              {listProduct.length > 0 ? (
                <>
                  <h2>Sản phẩm tương tự</h2>
                  <div className={styles.listProduct}>
                    {listProduct.map((item, index) => {
                      return <ItemProduct {...item} key={index} />;
                    })}
                  </div>
                </>
              ) : (
                <div className={styles.loading}>
                  <SK_Box width="100%" height="16px" />
                  <SK_Box width="100%" height="16px" />
                  <SK_Box width="100%" height="16px" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductView;

const BreadcrumbProduct = (props: any) => {
  const { category, product = "" } = props || {};
  return (
    <div className={styles.breadcrumb}>
      {product ? (
        <>
          <Link href={"/"}>Trang chủ</Link>
          <Link href={`/${category?.slug}`} className={styles.linkBreadcrumb}>
            {category?.title || ""}
          </Link>
          <p className={styles.linkProduct}>{product?.title || ""}</p>
        </>
      ) : (
        <SK_Box width="100%" height="20px" />
      )}
    </div>
  );
};
