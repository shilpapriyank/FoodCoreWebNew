import React from "react";
import { MyOrderItemComponent } from "./myorder-item.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetThemeDetails } from "@/components/common/utility";

export const MyOrdersComponent = ({
  orderHistoryFull,
  selectedItemClick,
}: any) => {
  const { restaurantinfo } = useReduxData();
  let selectedthemeURL = GetThemeDetails(restaurantinfo?.themetype as number);
  return (
    <div className="row pt-1 pb-4 row-cols-lg-2 row-cols-md-1 row-cols-1">
      {orderHistoryFull.map((item: any, index: any) => {
        // if (index < length) {
        return (
          <React.Fragment key={index}>
            <MyOrderItemComponent
              item={item}
              selectedItemClick={selectedItemClick}
              selectedthemeURL={selectedthemeURL}
            />
          </React.Fragment>
        );
        // }
      })}
    </div>
  );
};
