"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { GetThemeDetails, ThemeObj } from "@/components/common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const Page: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dynamic = pathname?.split("/").pop() || "";
  const { restaurantinfo } = useReduxData();

  useEffect(() => {
    let routepath = "";
    if (!dynamic || !restaurantinfo) return;

    const selectedTheme = GetThemeDetails(restaurantinfo.themetype);

    if (!selectedTheme) return;
    if (selectedTheme.name === ThemeObj.dominos) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
    } else if (selectedTheme.name === ThemeObj.default) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}/main`;
    } else if (selectedTheme.name === ThemeObj.newtheme) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
    }
    router.push(routepath);
    return;
  }, []);

  return (
    <>
      <div className="spinner-border text-info" role="status"></div>
    </>
  );
};

export default Page;
