import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
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

  return isMobile;
};

export default useIsMobile;
