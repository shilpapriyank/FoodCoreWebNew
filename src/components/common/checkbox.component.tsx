import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

interface CheckBoxProps {
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const CheckBox = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: CheckBoxProps) => {
  return (
    <>
      <input
        type="checkbox"
        name={`${item.optionId}_${item.subparameterId}`}
        id={String(type.suboptionId)}
        disabled={disabled}
        className={`cursor-pointer ${classInputName ?? ""}`}
        onChange={(e) =>
          handleOnChangeSubOption(
            type,
            item.optionId,
            type.subOptionselected ? "deselect" : "select",
            isRadioButton,
            e
          )
        }
        value={type.suboptionId}
        checked={type.subOptionselected === true}
      />
    </>
  );
};

export default React.memo(CheckBox);

// import React from "react";

// interface CheckBoxProps {
//   type: {
//     suboptionId: string;
//     subOptionselected: boolean;
//   };
//   item: {
//     optionId: string | number;
//     subparameterId: string | number;
//   };
//   isRadioButton: boolean;
//   classInputName?: string;
//   disabled?: boolean;
//   handleOnChangeSubOption: (
//     type: {
//       suboptionId: string | number;
//       subOptionselected: boolean;
//     },
//     optionId: string | number,
//     action: "select" | "deselect",
//     isRadioButton: boolean,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => void;
// }

// const CheckBox = ({
//   type,
//   item,
//   isRadioButton,
//   classInputName,
//   handleOnChangeSubOption,
//   disabled,
// }: CheckBoxProps) => {
//   return (
//     <>
//       <input
//         type="checkbox"
//         name={`${item.optionId}_${item.subparameterId}`}
//         id={type.suboptionId}
//         disabled={disabled}
//         className={`cursor-pointer ${classInputName}`}
//         onChange={(e) =>
//           handleOnChangeSubOption(
//             type,
//             item.optionId,
//             type.subOptionselected === true ? "deselect" : "select",
//             isRadioButton,
//             e
//           )
//         }
//         value={type.suboptionId}
//         checked={type?.subOptionselected == true}
//       />
//     </>
//   );
// };

// export default React.memo(CheckBox);
