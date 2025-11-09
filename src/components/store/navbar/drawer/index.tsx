import { CloseIcon } from "@/components/icons/svgIcons";
import Icon from "@/components/UI/icon";
import { listHeader } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Add import statement for React
import styles from "./styles.module.scss";
import DropdownFlat from "../dropdown-flat";
import { useTranslate } from "@/locales";

interface IProps {
  isVisible: boolean;
  quantity?: number;
  handleOnClose: () => void;
}
const Drawer: React.FC<IProps> = ({ isVisible, handleOnClose }) => {
  const { t } = useTranslate("all");

  const [show, setShow] = useState<any>(null);
  const renderLink = () => {
    return listHeader.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div className={styles.itemSubMenu}>
            <Link href={item.link} onClick={handleOnClose}>
              {t(item.title)}
            </Link>
            {item.subMenu ? (
              <div
                className={styles.arrow}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setShow(index);
                }}
              >
                <Icon
                  src="/images/icons/ic_arr_down.png"
                  width={16}
                  height={16}
                  className={styles.arrow}
                />
              </div>
            ) : null}
          </div>
          {item.subMenu && show === index ? (
            <div className={styles.subMenu}>
              {item.subMenu.map((sub, index) => (
                <div key={index}>
                  <Link href={sub.link} onClick={handleOnClose}>
                    {t(sub.title)}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    return () => {
      setShow(null);
    };
  }, [isVisible]);

  return (
    <div
      className={`${styles.container} ${!isVisible && styles.containerHide}`}
    >
      <div className={styles.background} onClick={handleOnClose} />
      <div
        className={`${styles.screenWindow} ${isVisible && styles.showWindow}`}
      >
        <div className={styles.header}>
          <Image
            alt="logo"
            src={"/images/new_logo.png"}
            width={165}
            height={63}
            quality={100}
            priority
          />
          <div onClick={handleOnClose}>
            <CloseIcon width={18} />
          </div>
        </div>
        <div className={styles.itemsContainer}>
          <div className={styles.itemMenu}>
            {renderLink()}
            <DropdownFlat onClose={handleOnClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Drawer;
