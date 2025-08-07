import { useCallback, useMemo } from "react";
import { CUSTOMER_TYPE, ORDERTYPE } from "../common/utility";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
import { useReduxData } from "./useredux-data-hooks";

const useUtility = () => {
  const { userinfo, restaurantinfo } = useReduxData();

  // TODO: false if user is login and user is subscribed use value 1
  const isDisplayPrice =
    userinfo === null || userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;
  const isRewardTip = userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;

  const checkIsBusinessNameRequiredForRestaurant = useCallback(
    (restaurantId: number) => {
      const businessNameRequiredRestaurantsIds =
        process.env.NEXT_PUBLIC_BUSINESSNAME_REQUIRED_RESTAURANT_IDS;
      if (businessNameRequiredRestaurantsIds) {
        const ids = businessNameRequiredRestaurantsIds.split(",");
        return ids.includes(restaurantId.toString());
      } else {
        return false;
      }
    },
    [restaurantinfo?.restaurantId]
  );

  const isBusinessNameRequired = useMemo(() => {
    return checkIsBusinessNameRequiredForRestaurant(
      restaurantinfo?.restaurantId as number
    );
  }, [restaurantinfo?.restaurantId]);

  const filterCategory = (allCat: any[], pickupordelivery: string) => {
    let filterlist: GetAllMenuCategoryItems[] = [];

    if (!pickupordelivery) {
      return allCat;
    } else {
      if (allCat?.length === 0) {
        return filterlist;
      }

      if (
        pickupordelivery &&
        pickupordelivery !== "" &&
        pickupordelivery !== undefined &&
        allCat?.length > 0
      ) {
        if (pickupordelivery === ORDERTYPE.Pickup) {
          filterlist = allCat.filter((x) => x.istakeoutavailable === true);
          // setcategories(filterlist)
        } else {
          filterlist = allCat.filter((x) => x.isdeliveryavailable === true);
          // setcategories(filterlist)
        }
      } else {
        filterlist = allCat;
        // setcategories(allCategory)
      }
      return filterlist;
    }
  };

  const isAddressRequired = restaurantinfo?.IsAddressMandatoryForRegister;

  return {
    isDisplayPrice,
    isRewardTip,
    isAddressRequired,
    isBusinessNameRequired,
    filterCategory,
  };
};

export default useUtility;
