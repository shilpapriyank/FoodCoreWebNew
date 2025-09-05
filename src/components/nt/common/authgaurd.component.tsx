"use client";

import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { GetThemeDetails } from "../../common/utility";
import { useParams, useRouter } from "next/navigation";

const AuthGuardComponent = (props: any) => {
  const restaurantinfo = useSelector(
    ({ restaurant }: { restaurant: any }) => restaurant.restaurantdetail,
    shallowEqual
  );
  const userinfo = useSelector(
    ({ userdetail }: { userdetail: any }) => userdetail.loggedinuser,
    shallowEqual
  );
  let selectedTheme = GetThemeDetails(restaurantinfo.themetype);
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, id, category, index } = params;
  useEffect(() => {
    if (userinfo === null) {
      router.push(`/${selectedTheme?.url}/${dynamic}/${location}`);
    }
  }, []);

  return <>{userinfo !== null && <div>{props?.children}</div>}</>;
};

export default AuthGuardComponent;
