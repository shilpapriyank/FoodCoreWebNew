import Link from "next/link";
import React from "react";
import { LogoProps } from "../../../../app/types/layout-types/layout.types";

const Logo = ({ logoUrl, path }: LogoProps) => {
  return (
    <>
      <Link href={path} className="logo">
        <span className="head-arrow">
          <i className="fa fa-angle-left" />{" "}
        </span>
        <img src={logoUrl} />{" "}
      </Link>
    </>
  );
};

export default Logo;
