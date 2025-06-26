"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// import { GetThemeDetails, ThemeObj } from '../../../components/dominos/helpers/utility';
// import { useReduxData } from '../../../components/customhooks/useredux-data-hook';
// import { PAGES } from '../../../components/default/Common/pages';

const Page: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const dynamic = params.dynamic as string | undefined;
  //const { dynamic } = router.query as { dynamic?: string }; // Type assertion for query param
  // const { restaurantinfo } = useReduxData();

  //   useEffect(() => {
  //     if (!dynamic || !restaurantinfo) return; // safety check to avoid undefined

  //     let routepath = '';
  //     const selectedTheme = GetThemeDetails(restaurantinfo.themetype);

  //     if (selectedTheme.name === ThemeObj.dominos) {
  //       routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}`;
  //     } else if (selectedTheme.name === ThemeObj.default) {
  //       routepath = `/${selectedTheme.url}/${dynamic}/${restaurantinfo.defaultLocation.locationURL}/${PAGES.MAIN}`;
  //     }

  //     router.push(routepath);

  //     // Optional cleanup or dispatch if needed
  //   }, [dynamic, restaurantinfo, router]);

  return (
    <div className="spinner-border text-secondary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Page;
