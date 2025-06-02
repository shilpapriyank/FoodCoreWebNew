"use client";

import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { GetThemeDetails, ThemeObj } from "@/components/common/utility";
import stylesloader from '../[dynamic]/stylesloader.module.css';

const DynamicPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const params = useParams();

  const dynamic = params?.dynamic;
  const location = params?.location;
  const theme = params?.theme;

  const restaurantinfo = useSelector(
    ({ restaurant }: any) => restaurant?.restaurantdetail,
    shallowEqual
  );

  useEffect(() => {
    let routepath = '';
    let selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    if (selectedTheme?.name === ThemeObj.dominos) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
    }
    else if (selectedTheme?.name === ThemeObj.default) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}/main`;
    }
    else if (selectedTheme?.name === ThemeObj.newtheme) {
      routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
    }
    router.push(routepath);
    //dispatch(ChangeUrl(true))
    return;
  }, [])


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", verticalAlign: "middle", marginTop: "15%" }}>
        <div className={stylesloader.customloader}></div>
      </div>
    </>
  );
};

export default DynamicPage;