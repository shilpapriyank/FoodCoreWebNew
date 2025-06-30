import { useCallback, useMemo } from "react";
import { CUSTOMER_TYPE, ORDER_TYPE_ENUM, ORDERTYPE } from "../common/utility";
import { useReduxData } from "./useredux-data-hooks";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";

const useUtility = () => {
  const { userinfo, restaurantinfo } = useReduxData();

  // ✅ Show price only if user is not subscribed
  const isDisplayPrice: boolean =
    !userinfo || userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;

  // ✅ Show reward/tip only if user is not subscribed
  const isRewardTip: boolean =
    userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;

  // ✅ Check if business name is required for this restaurant
  const checkIsBusinessNameRequiredForRestaurant = useCallback(
    (restaurantId?: number): boolean => {
      const ids =
        process.env.NEXT_PUBLIC_BUSINESSNAME_REQUIRED_RESTAURANT_IDS?.split(
          ","
        ) ?? [];
      return (
        restaurantId !== undefined && ids.includes(restaurantId.toString())
      );
    },
    []
  );

  // ✅ Memoized check based on current restaurant
  const isBusinessNameRequired = useMemo<boolean>(() => {
    return checkIsBusinessNameRequiredForRestaurant(
      restaurantinfo?.restaurantId
    );
  }, [restaurantinfo?.restaurantId, checkIsBusinessNameRequiredForRestaurant]);

  // ✅ Filter categories based on pickup/delivery type
  const filterCategory = (
    allCat: any[],
    pickupordelivery?: string
  ) => {
    if (!pickupordelivery || allCat?.length === 0) return allCat;

    if (pickupordelivery === ORDER_TYPE_ENUM.PICKUP) {
      return allCat.filter((cat) => cat.istakeoutavailable);
    } else if (pickupordelivery === ORDER_TYPE_ENUM.DELIVERY) {
      return allCat.filter((cat) => cat.isdeliveryavailable);
    }

    return allCat;
  };

  // ✅ Address required flag
  const isAddressRequired: boolean =
    !!restaurantinfo?.IsAddressMandatoryForRegister;

  return {
    isDisplayPrice,
    isRewardTip,
    isAddressRequired,
    isBusinessNameRequired,
    filterCategory,
  };
};

export default useUtility;

// import { useCallback, useMemo } from "react";
// import { CUSTOMER_TYPE, ORDER_TYPE_ENUM, ORDERTYPE } from "../common/utility";
// import { useReduxData } from "./useredux-data-hooks";
// import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
// import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";

// const useUtility = () => {
//   const { userinfo, restaurantinfo } = useReduxData();
//   //TODO:false if user is login and user is subscribed use value 1
//   const isDisplayPrice =
//     userinfo === null || userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;
//   const isRewardTip = userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;
//   const checkIsBusinessNameRequiredForRestaurant = useCallback(
//     (restaurantId: number) => {
//       const businessNameRequiredRestaurantsIds =
//         process.env.NEXT_PUBLIC_BUSINESSNAME_REQUIRED_RESTAURANT_IDS;
//       if (businessNameRequiredRestaurantsIds) {
//         const ids = businessNameRequiredRestaurantsIds.split(",");
//         return ids.includes(restaurantId.toString());
//       } else {
//         return false;
//       }
//     },
//     [restaurantinfo?.restaurantId]
//   );
//   const isBusinessNameRequired = useMemo(() => {
//     return checkIsBusinessNameRequiredForRestaurant(
//       restaurantinfo?.restaurantId as number
//     );
//   }, [restaurantinfo?.restaurantId]);
//   const filterCategory = (
//     allCat: MainCategoryList,
//     pickupordelivery: boolean
//   ) => {
//     let filterlist = [];
//     if (!pickupordelivery) {
//       return allCat;
//     } else {
//       if (allCat?.length === 0) {
//         return filterlist;
//       }
//       if (
//         pickupordelivery &&
//         pickupordelivery !== "" &&
//         pickupordelivery !== undefined &&
//         allCat?.length > 0
//       ) {
//         if (pickupordelivery === ORDER_TYPE_ENUM.PICKUP) {
//           filterlist = allCat.filter((x) => x.istakeoutavailable === true);
//           // setcategories(filterlist)
//         } else {
//           filterlist = allCat.filter((x) => x.isdeliveryavailable === true);
//           // setcategories(filterlist)
//         }
//       } else {
//         filterlist = allCat;
//         // setcategories(allCategory)
//       }
//       console.log("filtercategory from useutility", filterlist);
//       return filterlist;
//     }
//   };

//   const isAddressRequired = restaurantinfo?.IsAddressMandatoryForRegister;
//   return {
//     isDisplayPrice,
//     isRewardTip,
//     isAddressRequired,
//     isBusinessNameRequired,
//     filterCategory,
//   };
// };

// export default useUtility;
