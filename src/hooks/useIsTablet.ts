import { useEffect, useState } from "react";

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1024px)").matches,
  );

  useEffect(() => {
    const handleResize = () => {
      const tablet = window.matchMedia("(max-width: 1024px)").matches;
      setIsTablet(tablet);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Run handler on mount to ensure state is accurate
    handleResize();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isTablet;
};

export default useIsTablet;
