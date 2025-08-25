import React, { useEffect } from "react";
import { GetThemeDetails } from "../../common/utility";
import { useParams, useRouter } from "next/navigation";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { getCartItemCount } from "../../../../redux/tableorder/tableorder.slice";
import { useAppDispatch } from "../../../../redux/hooks";

const CartCounter = () => {
  const { restaurantinfo, userinfo, sessionid, cart } = useReduxData();
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const customerId = userinfo ? userinfo.customerId : 0;
  const dispatch = useAppDispatch();
  let cartcount = cart?.cartitemcount;
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${selctedTheme?.url}/${dynamic}/${location}/checkout`);
  };

  useEffect(() => {
    if (sessionid !== null) {
      dispatch(
        getCartItemCount({
          cartsessionid: sessionid,
          locationId: restaurantinfo?.defaultlocationId,
          restaurantId: restaurantinfo?.restaurantId,
          customerId: userinfo ? userinfo?.customerId : 0,
        })
      );
    }
  }, [userinfo]);

  return (
    <button
      onClick={(e) => handleClick(e)}
      className="px-0 fs-6 position-relative bg-white"
    >
      <i className="fa fa-shopping-cart color-green fs-5" />
      <span className="position-absolute top-0 start-100 translate-middle badge  rounded-circle bg-dynamic text-white">
        {cartcount as number}
        <span className="visually-hidden"></span>
      </span>
    </button>
  );
};

export default CartCounter;
