import React from "react";
import useUtility from "../../../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const MenuItemAddCartBtn = ({
  memorisedNetTotal,
  currencySymbol,
  addToCart,
}: any) => {
  const { menuitem } = useReduxData();
  let selectedmenuitemdetail = menuitem?.selectedmenuitemdetail;
  const { isDisplayPrice, isRewardTip } = useUtility();
  return (
    <div className="col-lg-4 ms-auto p-0 col-md-5 col-6 ps-md-1 pb-1 pb-md-0 ps-1 ps-md-0">
      <a className="btn-default btn-order py-2 py-md-0" onClick={addToCart}>
        {/* {selectedmenuitemdetail.cartid > 0 ? "Update" : "Add"} to order{" "} */}
        {isDisplayPrice && (
          <span>
            {currencySymbol}
            {memorisedNetTotal.toFixed(2)}
          </span>
        )}
      </a>
    </div>
  );
};

export default MenuItemAddCartBtn;
