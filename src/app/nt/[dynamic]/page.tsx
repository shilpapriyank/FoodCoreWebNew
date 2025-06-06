//src/app/nt/[dynamic]/page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { GetThemeDetails, ThemeObj } from "@/components/common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { ThemeType } from "@/types/common-types/common.types";

interface Location {
  locationURL: string;
}

interface RestaurantInfo {
  themetype: number;
  defaultLocation: Location;
}

const Page: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // might not be needed here
  const searchParams = useSearchParams();
  console.log("pathname", pathname);

  // dynamic param comes from segment in folder name
  const dynamic = pathname?.split("/").pop() || ""; // or get from searchParams if query string

  const { restaurantinfo } = useReduxData() as {
    restaurantinfo: RestaurantInfo | null;
  };

  useEffect(() => {
    // console.log("Dynamic segment:", dynamic);
    let routepath = "";
    if (!dynamic || !restaurantinfo) return;

    const selectedTheme: ThemeType | undefined = GetThemeDetails(
      restaurantinfo.themetype
    );

    if (!selectedTheme) return;
    if (selectedTheme.name === ThemeObj.dominos) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
    } else if (selectedTheme.name === ThemeObj.default) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}/main`;
    } else if (selectedTheme.name === ThemeObj.newtheme) {
      routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
    }
    router.push(routepath);
    //dispatch(ChangeUrl(true))
    return;
  }, []);

  return (
    <>
      <div className="spinner-border text-info" role="status"></div>
    </>
  );
};

export default Page;
