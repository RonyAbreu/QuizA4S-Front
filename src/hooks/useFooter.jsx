import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFooter = () => {
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/quiz")) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location.pathname]);

  return showFooter;
};
