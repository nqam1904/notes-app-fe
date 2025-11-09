"use client";

import { submitFeedback } from "@/actions/feedbackApi";
import Button from "@/components/UI/button";
import { isValidEmail, isValidPhoneNumber } from "@/utils/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./page.module.scss";
import { useTranslate } from "@/locales";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslate("all");
  
  const handleSubmit = async () => {
    try {
      if (name && description) {
        if (!isValidEmail(email)) {
          toast.warning(t("support.message.email.warning"), {
            autoClose: 2000,
          });
          return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
          toast.warning(t("support.message.phone.warning"), {
            autoClose: 2000,
          });
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
            toast.success(t("support.message.sended.success"));
            clearData();
          }
        }
      } else {
        toast.warning(t("support.message.fill.warning"), { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error, { autoClose: 2000 });
    }
  };
  const clearData = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setDescription("");
  };
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>{t("support.title")}</h1>
      <div className={styles.form}>
        <div className={styles.warperForm}>
          <div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder={t("support.input.fullname")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder={t("support.input.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                name="phone"
                placeholder={t("support.input.phone")}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <textarea
              name="desciption"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("support.input.description")}
            ></textarea>

            <div className={styles.warperButton}>
              <Button type="submit" text={t("support.button.submit")} onClick={handleSubmit} />
            </div>
          </div>
        </div>
        <div className={styles.mapResponsive}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29793.265423749035!2d105.744049!3d21.026356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134548454d7698b%3A0x5109177b4ad9d65f!2zS2h1IMSRw7QgdGjhu4sgU2luaCBUaMOhaSBYdcOibiBQaMawxqFuZw!5e0!3m2!1sen!2sus!4v1739635649822!5m2!1sen!2sus"
            allowFullScreen={true}
            width="600"
            height="200"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
