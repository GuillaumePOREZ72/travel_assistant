"use client";

import { ArrowBigUpDash } from "lucide-react";
import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-gray-500 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        <ArrowBigUpDash />
      </button>
    )
  );
};

export default BackToTopButton;
