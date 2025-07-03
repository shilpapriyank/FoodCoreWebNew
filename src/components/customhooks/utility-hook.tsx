import { useCallback, useMemo } from "react";
import { CUSTOMER_TYPE, ORDER_TYPE } from "../common/utility";
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

    if (pickupordelivery === ORDER_TYPE.PICKUP.text) {
      return allCat.filter((cat) => cat.istakeoutavailable);
    } else if (pickupordelivery === ORDER_TYPE.DELIVERY.text) {
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