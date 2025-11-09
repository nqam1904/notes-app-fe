"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

import { MenuIcon } from "@/components/icons/svgIcons";
import Icon from "@/components/UI/icon";
import { useTranslate } from "@/locales";
import { listHeader } from "@/mocks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Drawer from "./drawer";
import DropdownFlat from "./dropdown-flat";

const StoreNavBar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { t } = useTranslate("all");
  const pathName = usePathname();

  useEffect(() => {
    let prevPositionY = 0;
    if (typeof window !== "undefined") prevPositionY = window.scrollY;
    const handleScroll = () => {
      //---handle auto hiding navbar
      if (typeof window !== "undefined") {
        prevPositionY < window.scrollY && window.scrollY > 100
          ? setHideNavbar(true)
          : setHideNavbar(false);
        prevPositionY = window.scrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleVisibility = (isVisible: boolean) => {
    isVisible
      ? document.documentElement.classList.add("noScroll")
      : document.documentElement.classList.remove("noScroll");
    setIsActive(false);
  };
  const renderLink = () => {
    return listHeader.map((item, index) => {
      return (
        <div className={styles.headerItem} key={index}>
          <Link href={item.link}>{t(item.title)}</Link>
          {item.subMenu ? (
            <div
              className={styles.iconArrow}
              onClick={(e) => e.preventDefault()}
            >
              <Icon
                src="/images/icons/ic_arr_down.png"
                width={16}
                height={16}
              />
            </div>
          ) : null}
          {item.subMenu ? (
            <div className={styles.subMenu}>
              {item.subMenu.map((sub) => (
                <div className={styles.subMenuItem} key={sub.id}>
                  <Link href={sub.link} onClick={() => setIsActive(false)}>
                    {t(sub.title)}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );
    });
  };

  return (
    <nav className={`${styles.navbar} ${hideNavbar && styles.hideNavbar}`}>
      <section>
        <div className={styles.top}>
          <Link href={"/"}>
            <Image
              alt="logo"
              src={"/images/new_logo.png"}
              width={200}
              height={63}
              quality={100}
              priority
              className={styles.logo}
            />
          </Link>
          <div className={styles.header}>
            {renderLink()}
            <DropdownFlat />
          </div>
          {pathName === "/thu-vien/" && (
            <Image
              alt="logo"
              src={"/images/CARE_LOGO_TACHNEN.png"}
              width={150}
              height={60}
              quality={100}
              priority
              className={styles.logoCare}
            />
          )}
          <div className={styles.iconMenu} onClick={() => setIsActive(true)}>
            <MenuIcon width={24} />
          </div>
        </div>
      </section>
      <Drawer
        isVisible={isActive}
        handleOnClose={() => handleVisibility(false)}
      />
    </nav>
  );
};

export default StoreNavBar;
