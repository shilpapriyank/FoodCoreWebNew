
import React from "react";

const CheckBox = ({
  type,
  item,
  isRadioButton,
  classInputName,
  handleOnChangeSubOption,
  disabled,
}: any) => {
  return (
    <>
      <input
        type="checkbox"
        name={`${item.optionId}_${item.subparameterId}`}
        id={type.suboptionId}
        disabled={disabled}
        className={`cursor-pointer ${classInputName}`}
        onChange={(e) =>
          handleOnChangeSubOption(
            type,
            item.optionId,
            type.subOptionselected === true ? "deselect" : "select",
            isRadioButton,
            e
          )
        }
        //defaultChecked={type?.subOptionselected}
        value={type.suboptionId}
        checked={type?.subOptionselected == true}
      />

      {/* <input id={type.suboptionId} onChange={() => handleOnChangeSubOption(type, item.optionId, type.subOptionselected === true ? "deselect" : "select")} 
        value={type.suboptionId} name={`${item.optionId}_${item.subparameterId}`} type="radio" checked={type?.subOptionselected == true } /> */}
    </>
  );
};

export default React.memo(CheckBox);
