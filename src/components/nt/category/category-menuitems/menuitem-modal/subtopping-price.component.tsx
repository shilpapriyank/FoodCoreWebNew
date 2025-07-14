import { Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

interface SubToppingPriceProps {
  type: Type;
  isDisplayPrice: boolean;
  isExtraPaidTopping: boolean;
}

const SubToppingPrice = ({
  type,
  isDisplayPrice,
  isExtraPaidTopping,
}: SubToppingPriceProps) => {
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

// import React from 'react'

// const SubToppingPrice = ({ type, isDisplayPrice, isExtraPaidTopping } :any) => {
//     return (
//         <>
//             {(type?.price !== undefined && type?.price > 0 && isDisplayPrice && isExtraPaidTopping) &&
//                 <span className="color-green ml-2">
//                     {type.currency}{type.price.toFixed(2)}
//                 </span>
//             }
//         </>
//     )
// }

// export default SubToppingPrice
