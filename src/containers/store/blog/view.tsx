"use client";

import { submitFeedback } from "@/actions/feedbackApi";
import ItemSlideBlog from "@/components/store/blogs/item-slide-blog";
import Button from "@/components/UI/button";
import SlickSlider from "@/components/UI/slick-slide";
import { useTranslate } from "@/locales";
import { dataSection } from "@/mocks/blogs";
import { isValidEmail, isValidPhoneNumber } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
interface Props {
  dataNews: any[];
}
function BlogsView(props: Props) {
  const { dataNews } = props || {};
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslate("all");

  const handleSubmit = async () => {
    try {
      if (name && description) {
        if (!isValidEmail(email)) {
          toast.warning(t("news.feedback.email.warning"), { autoClose: 1000 });
          return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
          toast.warning(t("news.feedback.phone.warning"), { autoClose: 1000 });
          return;
        } else {
          const body = {
            data: {
              lastName: name,
              phoneNumber,
              email,
              content: description,
            },
          };
          const response = await submitFeedback(body);
          if ((response.payload as any).data) {
            toast.success(t("news.feedback.sended.success"));
            clearData();
          }
        }
      } else {
        toast.warning(t("news.feedback.fill.warning"), { autoClose: 1000 });
      }
    } catch (error) {
      toast.error(error, { autoClose: 500 });
    }
  };
  const clearData = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setDescription("");
  };
  const renderItem = useCallback(() => {
    return dataSection.map((item, index) => {
      return (
        <div className={styles.leftItem} key={index}>
          <Image
            alt="image"
            width={156}
            height={100}
            priority
            src={item.image}
            className={styles.imgBlog}
          />
          <span className={styles.text}>{t(item.content)}</span>
        </div>
      );
    });
  }, []);

  return (
    <section className={`${styles.container}`}>
      <div className={styles.news}>
        <h1 className={styles.titleNews}>{t("news.title")}</h1>
        <SlickSlider>
          {dataNews
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <ItemSlideBlog {...item} key={index} />
            ))}
        </SlickSlider>
        <br />
      </div>
      <div className={styles.section2}>
        <div className={styles.containerSection}>
          <h2 className={styles.titleSection2}>
            {t("news.description.title")}
          </h2>
          <div className={styles.descSection2}>
            <div className={styles.desLeft}>
              {renderItem()}
              <div className={styles.wraperButton}>
                <Button
                  text={t("news.description.button.readMore")}
                  onClick={() => router.push("/danh-cho-nang")}
                />
              </div>
            </div>
            <div className={styles.desRight}>
              <Image
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                src={"/images/blog4.png"}
                className={styles.imageSection}
              />
              <span className={styles.content}>
                {t("news.description.information")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h4>{t("news.feedback.title")}</h4>
        <p className={styles.formDescription}>{t("news.feedback.subtitle")}</p>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder={t("news.feedback.input.fullName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder={t("news.feedback.input.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              name="phone"
              placeholder={t("news.feedback.input.phone")}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <textarea
            name="question"
            rows={4}
            placeholder={t("news.feedback.input.question")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <Button
            type="submit"
            text={t("news.feedback.button.submit")}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}

export default BlogsView;
