import { useEffect } from "react";

const useScrollToTop = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.getElementById("scrollToTopButton")?.classList.add("show");
      } else {
        document.getElementById("scrollToTopButton")?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export { useScrollToTop };
