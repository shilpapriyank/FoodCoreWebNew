"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import { GetThemeDetails, ThemeObj } from '../../../components/dominos/helpers/utility';
// import { useReduxData } from '../../../components/customhooks/useredux-data-hook';

const Page: React.FC = () => {
  //const { restaurantinfo } = useReduxData();
  const router = useRouter();
  const params = useParams();

  // Type dynamic as possibly undefined string from router.query
  const dynamic = params.dynamic as string | undefined;
  //const { dynamic } = router.query as { dynamic?: string };

  //   useEffect(() => {
  //     // Safety check for required data
  //     if (!dynamic || !restaurantinfo) return;

  //     const selectedTheme = GetThemeDetails(restaurantinfo.themetype);
  //     let routepath = '';

  //     if (selectedTheme.name === ThemeObj.dominos) {
  //       routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
  //     } else if (selectedTheme.name === ThemeObj.default) {
  //       routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}/main`;
  //     }

  //     router.push(routepath);
  //   }, [dynamic, restaurantinfo, router]);

  return <div className="spinner-border text-info" role="status" />;
};

export default Page;
