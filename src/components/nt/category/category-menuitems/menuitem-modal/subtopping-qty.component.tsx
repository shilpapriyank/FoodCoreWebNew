import { Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

interface SubToppingQtyProps {
  increment: (optionId: number, type: Type, quantity: number) => void;
  decrement: (optionId: number, type: Type, isRadioButton: boolean) => void;
  type: Type;
  optionId: number;
  index?: number;
  isRadioButton: boolean;
  option?: any;
  handleOnChangeSubOption?: (
    type: Type,
    optionId: number,
    action: "select" | "deselect",
    isRadioButton: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const SubToppingQty = ({
  increment,
  decrement,
  type,
  optionId,
  index,
  isRadioButton,
  option,
  handleOnChangeSubOption,
}: any) => {
  const qty = type.subOptionToppingQuantity;

  return (
    <div className="d-flex ms-auto align-items-center">
      <div className="quantity normal qty-container roundstyle">
        <button
          type="button"
          className="qty-btn-minus btn-light quantity__minus"
          onClick={() => decrement(optionId, type, isRadioButton)}
        >
          <i className="fa fa-minus" />
        </button>
        <input
          data-value
          name="qty"
          readOnly
          value={qty}
          className="input-qty quantity__input"
        />
        <button
          type="button"
          className="qty-btn-plus btn-light quantity__plus"
          onClick={() => increment(optionId, type, qty)}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    </div>
  );
};

export default SubToppingQty;

// import React from 'react'

// const SubToppingQty = ({ increment, decrement, type, optionId, index, isRadioButton, option, handleOnChangeSubOption }: any) => {
//     const qty = type.subOptionToppingQuantity
//     return (
//         <div className="d-flex ms-auto align-items-center">
//             <div className="quantity normal qty-container roundstyle">
//                 <button type='button'  className={type.subOptionToppingQuantity > 0 ? "qty-btn-minus btn-light quantity__minus" : "qty-btn-minus btn-light quantity__minus"} onClick={() => decrement(optionId, type,isRadioButton)}>     <i className="fa fa-minus" /></button>
//                 <input data-value name="qty" readOnly value={qty} className="input-qty quantity__input" />
//                 <button  type='button'  className='qty-btn-plus btn-light quantity__plus' onClick={() => increment(optionId, type, type.subOptionToppingQuantity)}> <i className="fa fa-plus" /></button>
//             </div>
//         </div>
//     )
// }

// export default SubToppingQty
