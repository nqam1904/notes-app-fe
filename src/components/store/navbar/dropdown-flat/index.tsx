"use client";

import { allLangs, LanguageValue, useTranslate } from "@/locales";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import styles from "./styles.module.scss";
interface IProps{
  onClose?: () => void;
}
const DropdownFlat: React.FC<IProps> = ({ onClose }: IProps) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const { onChangeLang, currentLang } = useTranslate();

  const handleSetLanguage = useCallback(
    (newLang: LanguageValue) => {
      onChangeLang(newLang);
      setOpen(false);
      onClose && onClose?.();
    },
    [onChangeLang, open]
  );

  if (pathName === "/thu-vien/") return;

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={() => setOpen(!open)}>
        <Image
          src={currentLang.flat}
          alt={currentLang.label}
          className={styles.flag}
          width={26}
          height={20}
        />
      </button>
      {open && (
        <div className={styles.dropdownMenu}>
          {allLangs.map((lang) => (
            <div
              key={lang.value}
              className={styles.dropdownItem}
              onClick={() => handleSetLanguage(lang.value as LanguageValue)}
            >
              <Image
                src={lang.flat}
                alt={lang.label}
                width={26}
                height={20}
                className={styles.flag}
              />
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFlat;
