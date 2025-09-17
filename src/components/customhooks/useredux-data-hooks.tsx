import { shallowEqual } from "react-redux";
import { ORDER_TIME_TYPE, getCheckTimeArr } from "../common/utility";
import { RootState } from "../../../redux/store";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import { useAppSelector } from "../../../redux/hooks";

export const useReduxData = () => {
  const userinfo = useAppSelector(
    (state: RootState) => state.userdetail?.loggedinuser,
    shallowEqual
  );

  const restaurant = useAppSelector(
    (state: RootState) => state.restaurant,
    shallowEqual
  );

  const restaurantinfo = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantdetail,
    shallowEqual
  );

  const restaurantinfodetail = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantdetail,
    shallowEqual
  );

  const menuitem = useAppSelector(
    (state: RootState) => state.menuitem,
    shallowEqual
  );

  const menuitemdetaillist = useAppSelector(
    (state: RootState) => menuitem?.menuitemdetaillist,
    shallowEqual
  );

  const selecteddelivery = useAppSelector(
    (state: RootState) => state.selecteddelivery,
    shallowEqual
  );

  const cart = useAppSelector((state: RootState) => state.cart, shallowEqual);
  const category = useAppSelector(
    (state: RootState) => state.category,
    shallowEqual
  );
  const deliveryaddress = useAppSelector(
    (state: RootState) => state.deliveryaddress,
    shallowEqual
  );
  const main = useAppSelector((state: RootState) => state.main, shallowEqual);
  const metadata = useAppSelector(
    (state: RootState) => state.metadata,
    shallowEqual
  );
  const order = useAppSelector((state: RootState) => state.order, shallowEqual);

  const rewardpoints = useAppSelector(
    (state: RootState) => state.rewardpoints,
    shallowEqual
  );
  const session = useAppSelector(
    (state: RootState) => state.session,
    shallowEqual
  );
  // const studentdata = useAppSelector((state: RootState) => state.studentname, shallowEqual);
  const restaurantWindowTime = useAppSelector(
    (state: RootState) => state.main.restaurantWindowTime
  );
  const restauranttiming = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantstiminglist
  );
  const sessionid = useAppSelector(
    (state: RootState) => state.session?.sessionid
  );
  const addressList = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantslocationlist?.addressList
  );
  const [recievingTime, meredian, recievingDate] = getCheckTimeArr(
    order?.checktime,
    restaurantinfo as GetAllRestaurantInfo,
    order?.futureOrderDay?.futureDate || "",
    order?.isasap ?? false
  );
  const orderTimeValid =
    typeof order?.checktime === "string" && order?.checktime.trim() !== "";

  const restaurantlocation = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantslocationlist
  );
  const defaultLocation = useAppSelector(
    (state: RootState) => state.restaurant?.restaurantdetail?.defaultLocation
  );
  const tableorder = useAppSelector(
    (state: RootState) => state.tableorder,
    shallowEqual
  );
  const categoryItemsList = useAppSelector(
    (state: RootState) => state.category?.categoryitemlist,
    shallowEqual
  );
  const selectedcategorydetail = useAppSelector(
    (state: RootState) => state.category?.selectedcategorydetail,
    shallowEqual
  );
  const maincategoryList = useAppSelector(
    (state: RootState) => state.main?.maincategoryList,
    shallowEqual
  );
  const selectedcategory = useAppSelector(
    (state: RootState) => state.category?.selectedcategorydetail,
    shallowEqual
  );

  const orderTimeType =
    order?.isasap === true
      ? ORDER_TIME_TYPE.ASAP.value
      : ORDER_TIME_TYPE.LATERON.value;

  const cartItemsAmountTotal =
    cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
      (sum: any, item: any) => sum + (item?.totalprice || 0),
      0
    ) ?? 0;

  const cartItemsQuantity =
    cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
      (sum: any, item: any) => sum + (item?.qty || 0),
      0
    ) ?? 0;

  return {
    restaurantinfo,
    selecteddelivery,
    userinfo,
    menuitem,
    cart,
    category,
    deliveryaddress,
    main,
    metadata,
    order,
    restaurant,
    restaurantlocation,
    defaultLocation,
    maincategoryList,
    categoryItemsList,
    selectedcategory,
    orderTimeType,
    sessionid,
    restaurantWindowTime,
    session,
    restauranttiming,
    tableorder,
    recievingTime,
    meredian,
    recievingDate,
    rewardpoints,
    addressList,
    menuitemdetaillist,
    selectedcategorydetail,
    restaurantinfodetail,
    // studentdata,
    cartItemsAmountTotal,
    cartItemsQuantity,
  };
};
