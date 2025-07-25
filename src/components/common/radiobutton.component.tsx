import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

interface RadioButtonProps {
  type: Type;
  item: List;
  isRadioButton: boolean;
  classInputName?: string;
  disabled?: boolean;
  handleOnChangeSubOption: (
    type: Type,
    optionId: number,
    action: "select" | "deselect",
    isRadioButton: boolean,
    event: InputOrClickEvent
  ) => void;
}

const RadioButton = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: RadioButtonProps) => {
  return (
    <input
      id={String(type.suboptionId)}
      onChange={(e) =>
        handleOnChangeSubOption(
          type,
          item.optionId,
          type.subOptionselected === true ? "deselect" : "select",
          isRadioButton,
          e
        )
      }
      className={`cursor-pointer ${classInputName}`}
      disabled={disabled}
      value={type.suboptionId}
      name={`rdsuboption_${item.optionId}_${item.subparameterId}`}
      type="radio"
      checked={type?.subOptionselected === true}
    />
  );
};

export default React.memo(RadioButton);

// import React, { useEffect, useState } from "react";

// const RadioButton = ({
//   type,
//   item,
//   isRadioButton,
//   classInputName,
//   handleOnChangeSubOption,
//   disabled,
// }: any) => {
//   return (
//     <>
//       <input
//         id={type.suboptionId}
//         onChange={(e) =>
//           handleOnChangeSubOption(
//             type,
//             item.optionId,
//             type.subOptionselected === true ? "deselect" : "select",
//             isRadioButton,
//             e
//           )
//         }
//         className={`cursor-pointer ${classInputName}`}
//         disabled={disabled}
//         value={type.suboptionId}
//         name={`rdsuboption_${item.optionId}_${item.subparameterId}`}
//         type="radio"
//         checked={type?.subOptionselected == true}
//       />
//     </>
//   );
// };

// export default React.memo(RadioButton);
