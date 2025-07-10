import { Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

// interface PizzaSliceType {
//   pizzaside?: "L" | "F" | "R";
//   [key: string]: any;
// }

interface PizzaSliceProps {
  type: Type;
  handleOnChangeSubOption: (
    type: Type,
    optionId: number,
    side: "L" | "F" | "R",
    isRadioButton: boolean,
    event: React.MouseEvent
  ) => void;
  isRadioButton?: boolean;
  optionId: number;
}

const PizzaSlice = ({
  type,
  handleOnChangeSubOption,
  isRadioButton = false,
  optionId,
}: any) => {
  return (
    <div className="sun">
      <a
        className={`ft cursor-pointer ${
          type?.pizzaside === "L" ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(type, optionId, "L", isRadioButton, e)
        }
      />
      <a
        className={`sd cursor-pointer ${
          type?.pizzaside === "F" ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(type, optionId, "F", isRadioButton, e)
        }
      />
      <a
        className={`td cursor-pointer ${
          type?.pizzaside === "R" ? "active" : ""
        }`}
        onClick={(e) =>
          handleOnChangeSubOption(type, optionId, "R", isRadioButton, e)
        }
      />
    </div>
  );
};

export default PizzaSlice;

// import React from 'react'

// const PizzaSlice = ({ type, handleOnChangeSubOption, isRadioButton = false, optionId }: any) => {
//     return (
//         <div className="sun">
//             <a className={`ft  cursor-pointer ${type?.pizzaside === "L" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "L", isRadioButton, e)} />
//             <a className={`sd cursor-pointer ${type?.pizzaside === "F" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "F", isRadioButton, e)} />
//             <a className={`td cursor-pointer ${type?.pizzaside === "R" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "R", isRadioButton, e)} />
//         </div>
//     )
// }

// export default PizzaSlice
