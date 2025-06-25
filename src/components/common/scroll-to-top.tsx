import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";

// var Scroll = require('react-scroll');
var ScrollLink = Link;

const ScrollToTop = ({ toClass = "container-fluid" }) => {
  const [isVisible, SetIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        SetIsVisible(true);
      } else {
        SetIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <ScrollLink
        className="topArrow"
        to={toClass}
        //spy={true}
        smooth={true}
        offset={0}
        duration={100}
      >
        <i className="fa fa-arrow-up fs-4"></i>
      </ScrollLink>
    )
  );
};
export default ScrollToTop;
