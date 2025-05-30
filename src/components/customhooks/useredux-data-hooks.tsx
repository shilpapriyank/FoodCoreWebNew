import { shallowEqual, useSelector } from "react-redux";
import { ORDER_TIME_TYPE, getCheckTimeArr } from "../common/utility";

export const useReduxData = () => {
  const selecteddelivery = useSelector(
    ({ selecteddelivery }: any) => selecteddelivery,
    shallowEqual
  );
  const restaurantinfo = useSelector(
    ({ restaurant }: any) => restaurant.restaurantdetail,
    shallowEqual
  );
  const userinfo = useSelector(
    ({ userdetail }: any) => userdetail?.loggedinuser,
    shallowEqual
  );
  const menuitem = useSelector(({ menuitem }: any) => menuitem, shallowEqual);
  const cart = useSelector(({ cart }: any) => cart, shallowEqual);
  const category = useSelector(({ category }: any) => category, shallowEqual);
  const deliveryaddress = useSelector(
    ({ deliveryaddress }: any) => deliveryaddress,
    shallowEqual
  );
  const main = useSelector(({ main }: any) => main, shallowEqual);
  const metadata = useSelector(({ metadata }: any) => metadata, shallowEqual);
  const order = useSelector(({ order }: any) => order, shallowEqual);
  const restaurant = useSelector(
    ({ restaurant }: any) => restaurant,
    shallowEqual
  );
  const rewardpoints = useSelector(
    ({ rewardpoints }: any) => rewardpoints,
    shallowEqual
  );
  const session = useSelector(({ session }: any) => session, shallowEqual);
  const studentdata = useSelector(
    ({ studentname }: any) => studentname,
    shallowEqual
  );
  const restaurantWindowTime = useSelector(
    ({ main }: any) => main.restaurantWindowTime
  );
  const restauranttiming = useSelector(
    ({ restaurant }: any) => restaurant.restaurantstiminglist
  );
  const sessionid = useSelector(({ session }: any) => session?.sessionid);
  const addressList = useSelector(
    ({ restaurant }: any) => restaurant?.restaurantslocationlist?.addressList
  );
  const restaurantlocation = useSelector(
    ({ restaurant }: any) => restaurant?.restaurantslocationlist
  );
  const defaultLocation = useSelector(
    ({ restaurant }: any) => restaurant.restaurantdetail?.defaultLocation
  );
  const tableorder = useSelector(
    ({ tableorder }: any) => tableorder,
    shallowEqual
  );
  const [recievingTime, meredian, recievingDate] = getCheckTimeArr(
    order?.checktime,
    restaurantinfo,
    order?.futureOrderDay?.futureDate,
    order.isasap
  );
  const orderTimeType =
    order?.isasap === true
      ? ORDER_TIME_TYPE.ASAP.value
      : ORDER_TIME_TYPE.LATERON.value;
  // const categoryList = useSelector(({ category }) => category?.categorylist, shallowEqual);
  const categoryItemsList = useSelector(
    ({ category }: any) => category?.categoryitemlist,
    shallowEqual
  );
  const maincategoryList = useSelector(
    ({ main }: any) => main?.maincategoryList,
    shallowEqual
  );
  const selectedcategory = useSelector(
    ({ category }: any) => category?.selectedcategorydetail,
    shallowEqual
  );

  const cartItemsAmountTotal =
    cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
      (sum: any, item: any) => sum + (item?.totalprice || 0),
      0
    );

  const cartItemsQuantity =
    cart?.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
      (sum: any, item: any) => sum + (item?.qty || 0),
      0
    );
  return {
    selecteddelivery,
    restaurantinfo,
    userinfo,
    menuitem,
    cart,
    category,
    deliveryaddress,
    main,
    metadata,
    order,
    restaurant,
    rewardpoints,
    session,
    studentdata,
    restaurantWindowTime,
    restauranttiming,
    sessionid,
    addressList,
    restaurantlocation,
    defaultLocation,
    recievingTime,
    meredian,
    orderTimeType,
    tableorder,
    maincategoryList,
    categoryItemsList,
    selectedcategory,
    cartItemsAmountTotal,
    cartItemsQuantity,
  };
};
