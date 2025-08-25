import React from "react";
import { Type } from "@/types/menuitem-types/menuitem.type";

const SubToppingPrice: React.FC<{
  type: Type;
  isDisplayPrice: boolean;
  isExtraPaidTopping: boolean;
}> = ({ type, isDisplayPrice, isExtraPaidTopping }) => {
  return (
    <>
      {type?.price !== undefined &&
        type?.price > 0 &&
        isDisplayPrice &&
        isExtraPaidTopping && (
          <span className="color-green ml-2">
            {type.currency}
            {type.price.toFixed(2)}
          </span>
        )}
    </>
  );
};

export default SubToppingPrice;
