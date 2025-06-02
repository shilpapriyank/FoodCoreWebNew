// src/components/customhooks/useredux-data-hook.ts

import { shallowEqual, useSelector } from "react-redux";
import { ORDER_TIME_TYPE, getCheckTimeArr } from "../common/utility";
import { RootState } from "../../../redux/store";

export const useReduxData = () => {
  const restaurantinfo = useSelector(
    (state: RootState) => state.restaurant?.restaurantdetail,
    shallowEqual
  );

  //  const selecteddelivery = useSelector((state: RootState) => state.selecteddelivery, shallowEqual);
  // const userinfo = useSelector((state: RootState) => state.userdetail?.loggedinuser, shallowEqual);
  // const menuitem = useSelector((state: RootState) => state.menuitem, shallowEqual);
  // const cart = useSelector((state: RootState) => state.cart, shallowEqual);
  // const category = useSelector((state: RootState) => state.category, shallowEqual);
  // const deliveryaddress = useSelector((state: RootState) => state.deliveryaddress, shallowEqual);
  // const main = useSelector((state: RootState) => state.main, shallowEqual);
  // const metadata = useSelector((state: RootState) => state.metadata, shallowEqual);
  // const order = useSelector((state: RootState) => state.order, shallowEqual);
  // const restaurant = useSelector((state: RootState) => state.restaurant, shallowEqual);
  // const rewardpoints = useSelector((state: RootState) => state.rewardpoints, shallowEqual);
  // const session = useSelector((state: RootState) => state.session, shallowEqual);
  // const studentdata = useSelector((state: RootState) => state.studentname, shallowEqual);
  // const restaurantWindowTime = useSelector((state: RootState) => state.main.restaurantWindowTime);
  // const restauranttiming = useSelector((state: RootState) => state.restaurant.restaurantstiminglist);
  // const sessionid = useSelector((state: RootState) => state.session?.sessionid);
  // const addressList = useSelector((state: RootState) => state.restaurant?.restaurantslocationlist?.addressList);
  // const restaurantlocation = useSelector((state: RootState) => state.restaurant?.restaurantslocationlist);
  // const defaultLocation = useSelector((state: RootState) => state.restaurant.restaurantdetail?.defaultLocation);
  // const tableorder = useSelector((state: RootState) => state.tableorder, shallowEqual);
  // const categoryItemsList = useSelector((state: RootState) => state.category?.categoryitemlist, shallowEqual);
  // const maincategoryList = useSelector((state: RootState) => state.main?.maincategoryList, shallowEqual);
  // const selectedcategory = useSelector((state: RootState) => state.category?.selectedcategorydetail, shallowEqual);

  // const [recievingTime, meredian, recievingDate] = getCheckTimeArr(
  // order?.checktime,
  // restaurantinfo,
  // order?.futureOrderDay?.futureDate,
  // order.isasap
  // );

  // const orderTimeType =
  //   order?.isasap === true ? ORDER_TIME_TYPE.ASAP.value : ORDER_TIME_TYPE.LATERON.value;

  // const cartItemsAmountTotal =
  //   cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
  //     (sum, item) => sum + (item?.totalprice || 0),
  //     0
  //   ) ?? 0;

  // const cartItemsQuantity =
  //   cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
  //     (sum, item) => sum + (item?.qty || 0),
  //     0
  //   ) ?? 0;

  return {
    restaurantinfo,
    //   selecteddelivery,
    //   userinfo,
    //   menuitem,
    //   cart,
    //   category,
    //   deliveryaddress,
    //   main,
    //   metadata,
    //   order,
    //   restaurant,
    //   rewardpoints,
    //   session,
    //   studentdata,
    //   restaurantWindowTime,
    //   restauranttiming,
    //   sessionid,
    //   addressList,
    //   restaurantlocation,
    //   defaultLocation,
    //   recievingTime,
    //   meredian,
    //   recievingDate,
    //   orderTimeType,
    //   tableorder,
    //   maincategoryList,
    //   categoryItemsList,
    //   selectedcategory,
    //   cartItemsAmountTotal,
    //   cartItemsQuantity,
  };

};

