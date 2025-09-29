import Link from "next/link";
import React from "react";

const BackButton = ({ path }: { path: string }) => {
  return (
    <div>
      <Link className="btn-default pointer-cursor" href={path}>
        <i className="fa me-1 fa-angle-left" /> Back to order
      </Link>
    </div>
  );
};

export default BackButton;
