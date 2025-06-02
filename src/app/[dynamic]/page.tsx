"use client";

import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { GetThemeDetails, ThemeObj } from "@/components/common/utility"; // Adjust if path differs

const DynamicPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  // Read dynamic params like /[dynamic]/[location]/[theme] if defined like that in route
  const dynamic = params?.dynamic;
  const location = params?.location;
  const theme = params?.theme;

  const restaurantinfo = useSelector(
    ({ restaurant }: any) => restaurant?.restaurantdetail,
    shallowEqual
  );

  useEffect(() => {
    // Ensure necessary data is available before routing
    if (
      !restaurantinfo ||
      !restaurantinfo?.defaultLocation?.locationURL ||
      !dynamic
    ) {
      return;
    }

    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    let routepath = "";

    if (selectedTheme?.name === ThemeObj.dominos) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
    } else if (selectedTheme?.name === ThemeObj.default) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}/main`;
    } else if (selectedTheme?.name === ThemeObj.newtheme) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
    }

    router.push(routepath);
    // dispatch(ChangeUrl(true)); // If needed
  }, [restaurantinfo, dynamic, router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        verticalAlign: "middle",
        marginTop: "15%",
      }}
    ></div>
  );
};

export default DynamicPage;

// "use client";

// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { GetThemeDetails, ThemeObj } from "@/components/common/utility";

// const DynamicPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const {
//     query: { dynamic, location, theme },
//   } = router;
//   let restaurantinfo = useSelector(
//     ({ restaurant }: any) => restaurant?.restaurantdetail,
//     shallowEqual
//   );

//   useEffect(() => {
//     let routepath = "";
//     let selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
//     if (selectedTheme?.name === ThemeObj.dominos) {
//       routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
//     } else if (selectedTheme?.name === ThemeObj.default) {
//       routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}/main`;
//     } else if (selectedTheme?.name === ThemeObj.newtheme) {
//       routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
//     }
//     router.push(routepath);
//     //dispatch(ChangeUrl(true))
//     return;
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           verticalAlign: "middle",
//           marginTop: "15%",
//         }}
//       ></div>
//     </>
//   );
// };

// export default DynamicPage;
