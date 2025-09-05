"use client";

import Link from "next/link";
import React from "react";
import { GetThemeDetails } from "../../common/utility";
import { useParams, useRouter } from "next/navigation";

const NoOrderFoundComponent = ({ themeType }: any) => {
  let selectedTheme = GetThemeDetails(themeType);
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  return (
    <div className="row">
      <div className="col-12  ">
        <h5>No order found.</h5>
        <div>
          {" "}
          <Link
            //legacyBehavior
            href={`/${selectedTheme?.url}/[dynamic]/[location]`}
            as={`/${selectedTheme?.url}/${dynamic}/${location}`}
          >
            <u className="active-link">
              <h5 className="text-center cursor-pointer active-link">
                Start your first order
              </h5>
            </u>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoOrderFoundComponent;
