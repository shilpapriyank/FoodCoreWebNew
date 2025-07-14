import { List, Type } from "@/types/menuitem-types/menuitem.type";
import React from "react";

interface SubToppingRequiredWarningProps {
  item: List;
  handleOnChangeRemoveSubOption: (
    item: Type,
    optionId: number,
    selection: string
  ) => void;
}

const SubToppingRequiredWarning = ({
  item,
  handleOnChangeRemoveSubOption,
}: SubToppingRequiredWarningProps) => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        {item.isCompulsory === true && (
          <small className="red-text">
            Please choose 1 item from this selection.
          </small>
        )}
      </div>
      {!item?.multipleSelectStatus && (
        <div className="">
          <a
            className="cursor float-end change-right"
            onClick={() =>
              handleOnChangeRemoveSubOption(
                item as any,
                item.optionId,
                "deselectall"
              )
            }
          >
            DeSelect
          </a>
        </div>
      )}
    </div>
  );
};

export default SubToppingRequiredWarning;
