import React from "react";
import { useDispatch } from "react-redux";
import { ORDER_TYPE_ENUM, TOOLTIP_MSG } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";

const MenuItemQuickOrder = ({ item, quickOrderClick }: any) => {
  const { selecteddelivery, restaurantinfo } = useReduxData();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, category } = params;
  const deliveryaddressinfo = selecteddelivery;
  const locationSelected = restaurantinfo?.defaultLocation;

  const IsOrderDisable = () => {
    if (locationSelected && locationSelected.isOrderingDisable == true) {
      return <b className="red-text">{locationSelected?.orderingMessage}</b>;
    } else {
      if (
        deliveryaddressinfo &&
        deliveryaddressinfo.pickupordelivery === "Pickup" &&
        locationSelected?.isTakeoutOrderingDisable === true
      ) {
        return <b className="red-text">{locationSelected?.orderingMessage}</b>;
      } else if (
        deliveryaddressinfo &&
        deliveryaddressinfo.pickupordelivery === ORDER_TYPE_ENUM.DELIVERY &&
        locationSelected?.isDeliveryOrderingDisable === true
      ) {
        return <b className="red-text">{locationSelected?.orderingMessage}</b>;
      } else {
        return (
          <>
            <a
              className=" btn-default ms-3 small"
              data-toggle="tooltip"
              data-placement="left"
              title={TOOLTIP_MSG.QUICKORDER}
              onClick={() => quickOrderClick(item)}
            >
              Quick Order
            </a>
          </>
        );
      }
    }
  };
  return (
    <>
      <div className="d-flex align-items-center mt-2">
        <IsOrderDisable />
      </div>
    </>
  );
};
export default MenuItemQuickOrder;
