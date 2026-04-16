import { useEffect, useState } from "react";
import "./ScrollToTop.css"


function ScrollToTop() {  

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top ${visible ? "show" : ""}`}
      onClick={handleClick}
    >
      <img src="up.png" alt="scrollToUpArrow" />
    </button>
  );
}

export default ScrollToTop;