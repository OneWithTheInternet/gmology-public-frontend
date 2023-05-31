import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Helpper function to scroll user back to the top of the page when the URL changes
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
}