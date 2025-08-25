import React, { useState } from "react";
import SubTopping from "./subtopping.component";
import handleNotify from "../../../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../../../default/helpers/toaster/toaster-types";
import {
  calculateFinalCount,
  calculateFinalCountWithPaid,
} from "../../../../common/utility";
import useUtility from "../../../../customhooks/utility-hook";
import OptionHeader from "./option-header.component";
import SubToppingRequiredWarning from "./subtop-reqwarning.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { leftRightArray } from "@/components/nt/common/utility";
import { useAppDispatch } from "../../../../../../redux/hooks";
import {
  GetMenuItemDetail,
  List,
  Type,
} from "@/types/menuitem-types/menuitem.type";
import {
  removeMenuItem,
  selectedItemSize,
  updateitemoption,
} from "../../../../../../redux/menu-item/menu-item.slice";
import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";
import { PIZZA_SIDE_ENUM } from "@/components/common/enums";

const MenuItemOptions: React.FC<{
  isExpand: boolean;
  isLoad: boolean;
  count: number;
}> = ({ isExpand, isLoad, count }) => {
  const { menuitem } = useReduxData();
  const dispatch = useAppDispatch();
  let menuItemDetail = menuitem?.menuitemdetaillist;
  let selectedsize = menuItemDetail?.size.find((x) => x.sizeselected === true);
  let selectedtopping = menuItemDetail?.topping?.find(
    (x) => x.subparameterId === selectedsize?.subparameterId
  );
  let itemoptions = leftRightArray(selectedtopping);
  const [isExpandAll, setisExpandAll] = useState<boolean>(
    isExpand == true ? true : false
  );
  const [isOnLoadExpand, setisOnLoadExpand] = useState<boolean>(
    isExpand ?? false
  );
  const [isOpenFirst, setisOpenFirst] = useState<boolean>(true);
  const [minQty, setminQty] = useState<number>(0);
  const [reLoad, setreLoad] = useState<number>(0);
  const { isDisplayPrice } = useUtility();

  const handleOnChangeRemoveSubOption = (
    item: Type,
    optionId: number,
    selection: string,
    isRadioButton?: boolean,
    e?: InputOrClickEvent
  ) => {
    item = { ...item };
    let isFreeCountCalculation = true;

    const optionDetails = selectedtopping?.list?.find(
      (option) => option.optionId === optionId
    );
    if (
      !(
        (optionDetails && optionDetails?.freeToppingsCount > 0) ||
        optionDetails?.multipleSelectStatus === false
      )
    ) {
      isFreeCountCalculation = false;
    }
    //UPDATE THE SELCTED OPPTION STATUS:-item.subOptionselected TRUE OR FALSE
    let lstdefault: Type[] = [];
    let selectedoption = selectedtopping?.list.filter(
      (x) =>
        x.optionId == optionId &&
        x.subparameterId == selectedsize?.subparameterId
    );

    let tdata = selectedoption?.[0]?.type;

    const newArray = tdata?.map((a) => ({ ...a }));

    tdata?.map((data) => {
      data = { ...data };
      // HANDLING FOR THE CHECKBOX ON CHECK THE SUB-OPTION
      if (selection === "deselectall") {
        data.subOptionselected = false;
        data.subOptionToppingQuantity = 0;
        data.subOptionToppingQuantity = 0;
        data.sequenceNumber = 0;
        data.pizzaside = "";
      }
      //IF OPTION IS SELECTED THEN DESELECT
      else if (item.name === data.name) {
        if (selection === "deselect") {
          data.subOptionselected = false;
          data.subOptionToppingQuantity = 0;
          data.sequenceNumber = 0;
          data.pizzaside = "";
        }
      } else {
        data.sequenceNumber =
          data?.sequenceNumber === 0 ? 0 : data?.sequenceNumber - 1;
      }
      lstdefault.push(data);
    });

    //TODO:REMOVE FROM ISEXTRA
    if (!selectedoption || !selectedoption[0]) {
      return;
    }

    //to update the selectedoption.type
    let updatedSelectedOption = {
      ...(selectedoption?.[0] as List), //make copy of old selectedoption
      type: lstdefault, //assign lstdefault to type that hold the new updated type
    };

    let finalcount = calculateFinalCount(lstdefault, updatedSelectedOption);
    var isMaxSelectZero =
      updatedSelectedOption.freeToppingsCount == 0 ? true : false;
    var checkCount =
      isMaxSelectZero == false
        ? finalcount <= updatedSelectedOption.freeToppingsCount
          ? true
          : false
        : true;

    let updateWithPaidTopping: Type[] = [];
    if (isFreeCountCalculation) {
      updateWithPaidTopping = lstdefault?.map((subOption) => {
        if (item.suboptionId === subOption.suboptionId) {
          subOption.isExtraPaidTopping = item?.subOptionselected
            ? !checkCount
            : item?.subOptionselected;
          if (subOption.isExtraPaidTopping) {
            subOption.paidQty = subOption.paidQty + 1;
          } else {
            subOption.paidQty = 0;
          }
          return subOption;
        } else {
          subOption.isExtraPaidTopping = checkCount
            ? false
            : subOption?.isExtraPaidTopping;
          if (subOption.isExtraPaidTopping) {
            subOption.paidQty =
              subOption.paidQty === 0
                ? subOption.paidQty + 1
                : subOption.paidQty;
          } else {
            return {
              ...subOption,
              paidQty: 0,
            };
          }

          return subOption;
        }
      });
      let freeCount = updatedSelectedOption.freeToppingsCount;
      const sortedsuboptionBasedSeqNo = updateWithPaidTopping?.sort(
        (a, b) => b.sequenceNumber - a.sequenceNumber
      );
      const notPaidSuboption = sortedsuboptionBasedSeqNo.filter(
        (sub) => !sub.isExtraPaidTopping && sub?.subOptionselected
      );
      let totalFreeCount = calculateFinalCount(
        notPaidSuboption,
        updatedSelectedOption
      );
      const freeCountWithPaid = calculateFinalCountWithPaid(
        updateWithPaidTopping?.filter((sub) => sub.subOptionselected),
        updatedSelectedOption
      );
      let reaminingTotalFreeCount = Number(freeCount) - freeCountWithPaid;
      const sub = sortedsuboptionBasedSeqNo.map((sub) => {
        let subOptioncount = calculateFinalCount([sub], updatedSelectedOption);
        let remainCount = Number(freeCount) - subOptioncount;

        if (totalFreeCount <= remainCount && reaminingTotalFreeCount > 0) {
          const subOptionCount = calculateFinalCount(
            [sub],
            updatedSelectedOption
          );
          if (subOptionCount <= reaminingTotalFreeCount)
            reaminingTotalFreeCount = reaminingTotalFreeCount - subOptionCount;
          sub.isExtraPaidTopping = false;
          sub.paidQty = 0;
        } else if (
          subOptioncount > freeCount &&
          reaminingTotalFreeCount > 0 &&
          sub.isExtraPaidTopping
        ) {
          if (sub.paidQty > reaminingTotalFreeCount) {
            // change above condition if need
            sub.paidQty = sub.paidQty - reaminingTotalFreeCount;
            if (sub.paidQty === 0) {
              sub.isExtraPaidTopping = false;
            }
            reaminingTotalFreeCount = 0;
          } else if (sub.paidQty < reaminingTotalFreeCount) {
            const diff = reaminingTotalFreeCount - sub.paidQty;
            sub.paidQty = sub.paidQty - diff;
            if (sub.paidQty === 0) {
              sub.isExtraPaidTopping = false;
            }
            reaminingTotalFreeCount = diff;
          }
        } else {
          //update the paid qty for suboption when the user last selected have 2 qty(this option is 2 paid qty make one one paid)  and user unselect the freeoption
          if (remainCount === 0 && reaminingTotalFreeCount > 0) {
            const subOptionCount = calculateFinalCount(
              [sub],
              updatedSelectedOption
            );
            sub.paidQty = subOptionCount - reaminingTotalFreeCount;
            reaminingTotalFreeCount = reaminingTotalFreeCount - sub.paidQty;
          }
        }
        return sub;
      });
    }

    let lstobj = {
      optionselected: updatedSelectedOption.optionselected,
      subparameterId: updatedSelectedOption.subparameterId,
      name: updatedSelectedOption.name,
      maxSelection: updatedSelectedOption.maxSelection,
      type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
    };

    const updatedList = selectedtopping?.list.map((data) => {
      if (data.optionId === updatedSelectedOption.optionId) {
        return {
          ...data,
          type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
        };
      }
      return data;
    });

    let updatedTopping = {
      subparameterId: selectedtopping?.subparameterId,
      list: updatedList,
    };

    const updatedMenuItemDetail = {
      ...menuItemDetail,
      topping: menuItemDetail?.topping.map((data) =>
        data.subparameterId === selectedsize?.subparameterId
          ? updatedTopping
          : data
      ),
    };

    dispatch(removeMenuItem());
    dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
    dispatch(updateitemoption());
    setreLoad(Math.random());
  };

  const handleOnChangeSubOption = (
    item: Type,
    optionId: number,
    selection: string,
    isRadioButton: boolean,
    e: InputOrClickEvent
  ) => {
    item = { ...item };
    let isFreeCountCalculation = true;
    const optionDetails = selectedtopping?.list?.find(
      (option) => option.optionId === optionId
    );
    if (
      !(
        (optionDetails && optionDetails?.freeToppingsCount > 0) ||
        optionDetails?.multipleSelectStatus === false
      )
    ) {
      isFreeCountCalculation = false;
    }
    //check if item is already pizzaside and selection is pizzaside then remove it
    if (selection === item.pizzaside && item?.subOptionselected) {
      handleOnChangeRemoveSubOption(
        item,
        optionId,
        "deselect",
        isRadioButton,
        e
      );
      return;
    }
    //
    if (selection === item.pizzaside && selection !== "") {
      decrement(optionId, item, isRadioButton);
      return;
    }
    //UPDATE THE SELCTED OPPTION STATUS:-item.subOptionselected TRUE OR FALSE
    let lstdefault: Type[] = [];
    let selectedoption = selectedtopping?.list.filter(
      (x) =>
        x.optionId == optionId &&
        x.subparameterId == selectedsize?.subparameterId
    );
    let tdata = selectedoption?.[0].type;
    let newArray = tdata?.map((a) => ({ ...a }));

    tdata?.map((data) => {
      data = { ...data };
      if (item.name === data.name && item.subOptionselected === false) {
        let selectionTypeTopizzaSide =
          selection === "select"
            ? selectedoption?.[0]?.isHalfPizza
              ? PIZZA_SIDE_ENUM.FULL
              : ""
            : selection === "deselect"
            ? ""
            : selection;

        item.subOptionselected = true;
        data.subOptionselected = true;
        data.subOptionToppingQuantity = 1;
        data.pizzaside = selectionTypeTopizzaSide;
      } else if (data.subOptionselected === true && isRadioButton === true) {
        const AnotherSubOptionSelected = tdata?.find(
          (item) => item.subOptionselected
        );
        const isSuboptionAlreadySelectedForPizza =
          AnotherSubOptionSelected?.suboptionId === data.suboptionId;

        const isSelect =
          selection !== "" &&
          data.subOptionselected &&
          item.subOptionselected &&
          isSuboptionAlreadySelectedForPizza;

        data.subOptionselected = isSelect;
        data.subOptionToppingQuantity = isSelect ? 1 : 0;
        data.pizzaside = isSelect ? selection : "";
      } else if (
        selection !== "" &&
        data?.subOptionselected &&
        !isRadioButton
      ) {
        data.subOptionselected = true;
        data.subOptionToppingQuantity = data.subOptionToppingQuantity;
        data.subOptionselected = true;
        data.subOptionToppingQuantity = data.subOptionToppingQuantity;
      }

      lstdefault.push(data);
    });

    //to update the selectedoption.type
    let updatedSelectedOption = {
      ...(selectedoption?.[0] as List), //make copy of old selectedoption
      type: lstdefault, //assign lstdefault to type that hold the new updated type
    };

    let finalcount = calculateFinalCount(lstdefault, updatedSelectedOption);

    var isMaxSelectZero = isFreeCountCalculation
      ? updatedSelectedOption.freeToppingsCount == 0
        ? true
        : false
      : updatedSelectedOption.maxSelection == 0
      ? true
      : false;
    var checkCount = isFreeCountCalculation
      ? isMaxSelectZero == false
        ? finalcount <= updatedSelectedOption.freeToppingsCount
          ? true
          : false
        : true
      : isMaxSelectZero == false
      ? finalcount <= updatedSelectedOption.maxSelection
        ? true
        : false
      : true;
    //TODO:CHECKCOUNT IS FALSE THEN MAKE isExtraPaidTopping TRUE for that update the lstdefault array based on on
    //TODO:lso update the sequence number
    const selectedSubOption = lstdefault?.find(
      (sub) => sub.suboptionId === item?.suboptionId
    );
    var topvalue =
      selectedSubOption?.toppingValue === "" ||
      Number(selectedSubOption?.toppingValue) === 0
        ? 1
        : Number(selectedSubOption?.toppingValue);
    var calculatedtopvalue = topvalue;
    if (
      (updatedSelectedOption.isHalfPizza === true &&
        selectedSubOption?.pizzaside === PIZZA_SIDE_ENUM.LEFT) ||
      selectedSubOption?.pizzaside === PIZZA_SIDE_ENUM.RIGHT
    ) {
      const percentage =
        selectedSubOption.halfPizzaPriceToppingPercentage === 0 ||
        selectedSubOption.halfPizzaPriceToppingPercentage === undefined ||
        selectedSubOption.halfPizzaPriceToppingPercentage === null
          ? 1
          : selectedSubOption.halfPizzaPriceToppingPercentage / 100;

      calculatedtopvalue = topvalue * percentage;
    }

    const subOptionCount =
      Number(selectedSubOption?.subOptionToppingQuantity) *
      Number(calculatedtopvalue);

    let updateWithPaidTopping: Type[] = [];
    if (isFreeCountCalculation) {
      const topRecord = lstdefault.reduce((max, subOption) =>
        subOption.sequenceNumber > max.sequenceNumber ? subOption : max
      );
      updateWithPaidTopping = lstdefault?.map((subOption) => {
        if (item.suboptionId === subOption.suboptionId) {
          subOption.sequenceNumber = topRecord?.sequenceNumber + 1;
          subOption.isExtraPaidTopping = !checkCount;
          if (subOption.isExtraPaidTopping) {
            subOption.paidQty =
              subOption.paidQty + 1 > subOption?.subOptionToppingQuantity
                ? subOption.paidQty
                : subOption.paidQty + 1;
          } else {
            subOption.paidQty = 0;
          }
          return subOption;
        } else {
          if (!subOption.isExtraPaidTopping) {
            subOption.paidQty = 0;
          }
          return subOption;
        }
      });
    }

    const isValidMaxSelection = isFreeCountCalculation
      ? finalcount < updatedSelectedOption.maxSelection
      : finalcount <= updatedSelectedOption.maxSelection;
    if (
      (item.subOptionselected === true &&
        isValidMaxSelection &&
        subOptionCount <= Number(selectedSubOption?.suboptionmaxselection)) ||
      isRadioButton
    ) {
      let lstobj = {
        optionselected: updatedSelectedOption.optionselected,
        subparameterId: updatedSelectedOption.subparameterId,
        name: updatedSelectedOption.name,
        maxSelection: updatedSelectedOption.maxSelection,
        type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
      };

      //UPDATE THE LIST
      const updatedList = selectedtopping?.list.map((data) => {
        if (data.optionId === updatedSelectedOption.optionId) {
          return {
            ...data,
            type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
          };
        }
        return data;
      });

      let updatedTopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: updatedList,
      };

      const updatedMenuItemDetail = {
        ...menuItemDetail,
        topping: menuItemDetail?.topping.map((data) =>
          data.subparameterId === selectedsize?.subparameterId
            ? updatedTopping
            : data
        ),
      };

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
      dispatch(updateitemoption());
      setreLoad(Math.random());
    } else {
      if (e.target instanceof HTMLInputElement) {
        e.target.checked = false;
      }
      let lstobj = {
        optionselected: updatedSelectedOption.optionselected,
        subparameterId: updatedSelectedOption.subparameterId,
        name: updatedSelectedOption.name,
        maxSelection: updatedSelectedOption.maxSelection,
        type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
      };

      const updatedList = selectedtopping?.list.map((option) => {
        if (option.optionId === optionId) {
          return {
            ...option,
            type: newArray, // Replace the type safely
          };
        }
        return option;
      });

      let updatedTopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: updatedList,
      };

      const updatedMenuItemDetail = {
        ...menuItemDetail,
        topping: menuItemDetail?.topping.map((data) =>
          data.subparameterId === selectedsize?.subparameterId
            ? updatedTopping
            : data
        ),
      };

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
      setreLoad(Math.random());
      if (subOptionCount > Number(selectedSubOption?.suboptionmaxselection)) {
        handleNotify(
          "Select max " + selectedSubOption?.suboptionmaxselection + " choices",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      } else {
        handleNotify(
          "Select max " + updatedSelectedOption.maxSelection + " choices",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      }
    }
  };

  const selectedquantityClick = (
    optionId: number,
    quantity: number,
    suboptionId: number,
    operator: string
  ) => {
    let isFreeCountCalculation = true;
    const optionDetails = selectedtopping?.list?.find(
      (option) => option.optionId === optionId
    );
    if (
      optionDetails &&
      !(
        optionDetails?.freeToppingsCount > 0 ||
        optionDetails?.multipleSelectStatus === false
      )
    ) {
      isFreeCountCalculation = false;
    }
    let selectedoption = selectedtopping?.list.filter(
      (x) =>
        x.optionId == optionId &&
        x.subparameterId == selectedsize?.subparameterId
    );
    let lstdefault: Type[] = [];
    let tdata = selectedoption?.[0].type;
    const newArray = tdata?.map((a) => Object.assign({}, a));

    let suboptionmaxselection = 0;
    tdata?.map((data) => {
      data = { ...data };
      if (data.suboptionId === suboptionId) {
        if (data.subOptionselected === false) {
          data.subOptionToppingQuantity = 0;
          data.isExtraPaidTopping = false;
        } else {
          data.subOptionToppingQuantity = quantity;
          suboptionmaxselection = data.suboptionmaxselection;
        }
        if (quantity === 0) {
          data.pizzaside = "";
          data.sequenceNumber =
            data.sequenceNumber === 0 ? 0 : data.sequenceNumber - 1;
          data.subOptionselected = false;
        }
      }
      lstdefault.push(data);
    });

    let updatedSelectedOption = {
      ...(selectedoption?.[0] as List), //make copy of old selectedoption
      type: lstdefault, //assign lstdefault to type that hold the new updated type
    };

    let finalcount: number = 0;
    if (lstdefault && selectedoption?.[0]) {
      finalcount = calculateFinalCount(lstdefault, updatedSelectedOption);
    }

    let isMaxSelectZero;
    if (updatedSelectedOption && updatedSelectedOption.maxSelection == 0)
      isMaxSelectZero = true;
    else isMaxSelectZero = false;
    let checkCount;
    if (isMaxSelectZero == false)
      if (isFreeCountCalculation) {
        checkCount =
          finalcount <= Number(updatedSelectedOption.freeToppingsCount) ||
          finalcount <= suboptionmaxselection ||
          finalcount <= Number(updatedSelectedOption.maxSelection)
            ? true
            : false;
      } else {
        checkCount =
          finalcount <= Number(updatedSelectedOption.maxSelection) ||
          finalcount <= suboptionmaxselection
            ? true
            : false;
      }
    else checkCount = true;
    const isExtraPaidTopping = !(
      finalcount <= Number(updatedSelectedOption.freeToppingsCount)
    );

    let updateWithPaidTopping: Type[];
    if (checkCount) {
      selectedtopping?.list.map((data) => {
        let type =
          updatedSelectedOption.optionId === data.optionId
            ? lstdefault
            : data.type;
        if (isFreeCountCalculation) {
          updateWithPaidTopping = type?.map((subOption) => {
            if (isExtraPaidTopping && suboptionId === subOption.suboptionId) {
              subOption.isExtraPaidTopping = isExtraPaidTopping;
              return subOption;
            } else {
              return subOption;
            }
          });

          let freeCount = updatedSelectedOption.freeToppingsCount;
          const isAllToppingPaid = updateWithPaidTopping
            ?.filter((sub) => sub.subOptionselected)
            ?.every((sub) => sub.isExtraPaidTopping);
          const sortedsuboptionBasedSeqNo = updateWithPaidTopping?.sort(
            (a, b) => b.sequenceNumber - a.sequenceNumber
          );

          const sub = sortedsuboptionBasedSeqNo.map((sub) => {
            let subOptioncount: number = 0;
            if (updatedSelectedOption) {
              subOptioncount = calculateFinalCount(
                [sub],
                updatedSelectedOption
              );
            }

            let remaniCount = Number(freeCount) - subOptioncount;
            freeCount = remaniCount;
            if (operator === "-") {
              if (
                sub.paidQty > 0 &&
                sub.isExtraPaidTopping &&
                suboptionId === sub?.suboptionId
              ) {
                sub.paidQty = sub.paidQty - 1;
                if (sub.paidQty === 0) {
                  sub.isExtraPaidTopping = false;
                }
              } else if (
                sub.paidQty > 0 &&
                !sub.isExtraPaidTopping &&
                suboptionId === sub?.suboptionId
              ) {
                sub.paidQty = sub.paidQty - 1;
                if (sub.paidQty === 0) {
                  sub.isExtraPaidTopping = false;
                }
              } else {
              }
            } else {
              if (
                sub.isExtraPaidTopping &&
                isAllToppingPaid &&
                suboptionId === sub?.suboptionId &&
                quantity > 1
              ) {
                sub.paidQty = sub.paidQty + 1;
              } else {
                if (
                  sub.isExtraPaidTopping &&
                  quantity > 1 &&
                  suboptionId === sub?.suboptionId
                ) {
                  sub.paidQty = sub.paidQty + 1;
                }
              }
            }
            return sub;
          });
        }
        let myobj = {
          optionselected: data.optionselected,
          subparameterId: data.subparameterId,
          name: data.name,
          maxSelection: data.maxSelection,
          type: isFreeCountCalculation
            ? updateWithPaidTopping
            : selectedtopping?.list,
        };
      });

      const updatedList = selectedtopping?.list.map((data) => {
        if (data.optionId === updatedSelectedOption.optionId) {
          return updatedSelectedOption;
        }
        return data;
      });

      let updatedTopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: updatedList,
      };

      const updatedMenuItemDetail = {
        ...menuItemDetail,
        topping: menuItemDetail?.topping.map((data) =>
          data.subparameterId === selectedsize?.subparameterId
            ? updatedTopping
            : data
        ),
      };

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
      dispatch(updateitemoption());
    } else {
      selectedtopping?.list.map((data) => {
        let type =
          updatedSelectedOption.optionId === data.optionId
            ? newArray
            : data.type;
        let lstobj = {
          optionselected: data.optionselected,
          subparameterId: data.subparameterId,
          name: data.name,
          maxSelection: data.maxSelection,
          type: type,
        };

        if (data.optionId === updatedSelectedOption.optionId) {
          return updatedSelectedOption;
        }
        return data;
      });

      const updatedList = selectedtopping?.list.map((data) => {
        if (data.optionId === updatedSelectedOption.optionId) {
          return updatedSelectedOption;
        }
        return data;
      });

      let updatedTopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: updatedList,
      };

      const updatedMenuItemDetail = {
        ...menuItemDetail,
        topping: menuItemDetail?.topping.map((data) =>
          data.subparameterId === selectedsize?.subparameterId
            ? updatedTopping
            : data
        ),
      };
      dispatch(removeMenuItem());
      dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
      handleNotify(
        "Select max " + updatedSelectedOption.maxSelection + " choices",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    }
  };

  const increment = (optionId: number, data: Type) => {
    let isFreeCountCalculation = true;

    const optionDetails = selectedtopping?.list?.find(
      (option) => option.optionId === optionId
    );
    if (
      optionDetails &&
      !(
        optionDetails?.freeToppingsCount > 0 ||
        optionDetails?.multipleSelectStatus === false
      )
    ) {
      // incrementOld(optionId, data)
      isFreeCountCalculation = false;
      // return;
    }
    let selectedoption = selectedtopping?.list.filter(
      (x) =>
        x.optionId == optionId &&
        x.subparameterId == selectedsize?.subparameterId
    );
    let tdata = selectedoption?.[0].type;
    let finalcount: number = 0;
    if (tdata && selectedoption) {
      finalcount = calculateFinalCount(tdata, selectedoption?.[0]);
    }
    if (finalcount === selectedoption?.[0].maxSelection) {
      handleNotify(
        "Select max " + selectedoption[0].maxSelection + " choices",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return;
    } else if (data.suboptionmaxselection > 0 && isFreeCountCalculation) {
      // const plusState = data.subOptionToppingQuantity + 1;
      var topvalue =
        data.toppingValue === "" || Number(data.toppingValue) === 0
          ? 1
          : Number(data.toppingValue);
      var calculatedtopvalue =
        selectedoption?.[0].isHalfPizza === true &&
        (data.pizzaside === PIZZA_SIDE_ENUM.LEFT || data.pizzaside === PIZZA_SIDE_ENUM.RIGHT)
          ? topvalue *
            (data.halfPizzaPriceToppingPercentage === 0
              ? 1
              : data.halfPizzaPriceToppingPercentage / 100)
          : topvalue;
      const subOptionCount = data.subOptionToppingQuantity * calculatedtopvalue;
      if (subOptionCount >= data?.suboptionmaxselection) {
        handleNotify(
          "Select max " + data?.suboptionmaxselection + " choices",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
        return;
      }
    } else if (data.suboptionmaxselection > 0) {
      var topvalue =
        data.toppingValue === "" || Number(data.toppingValue) === 0
          ? 1
          : Number(data.toppingValue);
      var calculatedtopvalue =
        selectedoption?.[0].isHalfPizza === true &&
        (data.pizzaside === PIZZA_SIDE_ENUM.LEFT || data.pizzaside === PIZZA_SIDE_ENUM.RIGHT)
          ? topvalue *
            (data.halfPizzaPriceToppingPercentage === 0
              ? 1
              : data.halfPizzaPriceToppingPercentage / 100)
          : topvalue;
      const subOptionCount =
        (data.subOptionToppingQuantity + 1) * calculatedtopvalue;
      // const plusState = data.subOptionToppingQuantity + 1;
      if (subOptionCount > data?.suboptionmaxselection) {
        // handleNotify("Topping value is exceed " + data?.suboptionmaxselection + " toppings", ToasterPositions.TopRight, ToasterTypes.Error);
        handleNotify(
          "Select max " + data?.suboptionmaxselection + " choices",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
        return;
      }
    }

    const plusState = data?.subOptionToppingQuantity + 1;
    selectedquantityClick(optionId, plusState, data.suboptionId, "+");
  };

  const decrement = (optionId: number, data: Type, isRadioButton: boolean) => {
    if (minQty === data.subOptionToppingQuantity) {
      selectedquantityClick(optionId, minQty, data.suboptionId, "-");
      return;
    }
    const minusState = data.subOptionToppingQuantity - 1;
    if (minusState === 0) {
      handleOnChangeRemoveSubOption(data, optionId, "deselect", isRadioButton);
      return;
    }
    selectedquantityClick(optionId, minusState, data.suboptionId, "-");
  };

  function gcd(a: number, b: number): number {
    if (a === 0) return b;
    if (b === 0) return a;
    if (a < b) return gcd(a, b % a);
    return gcd(b, a % b);
  }

  function improperFractionToMixedNumber(n: number, d: number) {
    const i = Math.floor(n / d);
    n -= i * d;
    return [i, n, d];
  }

  function decimalToFraction(number: number) {
    const letVal = Math.floor(number);
    const fVal = number - letVal;
    const pVal = 10;

    const numerator = Math.round(fVal * pVal);
    //const denominator = pVal;

    const gcdVal = gcd(numerator, pVal);
    const num = numerator / gcdVal;
    const deno = pVal / gcdVal;

    const numberVal = letVal * deno + num;
    const result = improperFractionToMixedNumber(numberVal, deno);

    if (result[1] > 0) {
      return (
        <>
          {result[0] > 0 ? `${result[0]} ` : ""}
          <sup>{result[1]}</sup>/<sub>{result[2]}</sub>
        </>
      );
    } else if (result[0] < 0) {
      return 0;
    } else {
      return result[0];
    }
  }

  const calculateToppingRemaining = (optionId: number) => {
    const selectedoption =
      selectedtopping &&
      selectedtopping?.list?.length > 0 &&
      selectedtopping.list.filter(
        (x) =>
          x.optionId === optionId &&
          x.subparameterId === selectedsize?.subparameterId
      );

    if (selectedoption && selectedoption.length > 0) {
      const tdata = selectedoption[0].type;
      const finalcount = calculateFinalCount(tdata, selectedoption[0]);
      if (finalcount <= selectedoption[0].maxSelection) {
        return decimalToFraction(selectedoption[0].maxSelection - finalcount);
      }
    }
  };

  const selectedOptionClick = (
    option: List,
    item: Type | undefined,
    alltype: string
  ) => {
    const lstdefault: Type[] = option.type.map((data) => ({
      ...data,
      defaultSelection:
        alltype === "all"
          ? "all"
          : item?.suboptioncategoryname === data.suboptioncategoryname
          ? item.suboptioncategoryname
          : undefined,
    }));

    const updatedOption: List = {
      ...option,
      type: lstdefault,
    };

    const updatedList = selectedtopping?.list.map((opt) =>
      opt.optionId === option.optionId ? updatedOption : opt
    );

    const updatedTopping = {
      ...selectedtopping,
      list: updatedList,
    };

    const updatedToppings = menuItemDetail?.topping.map((top) =>
      top.subparameterId === selectedsize?.subparameterId ? updatedTopping : top
    );

    const updatedMenuItemDetail = {
      ...menuItemDetail,
      topping: updatedToppings,
    };

    dispatch(removeMenuItem());
    dispatch(selectedItemSize(updatedMenuItemDetail as GetMenuItemDetail));
    dispatch(updateitemoption());
  };

  const handleClickSubOptionAll = () => {};
  return (
    <>
      {selectedtopping?.list && (
        <div className="accordion" id="toppings-accordion">
          <div className="row">
            {selectedtopping.list.map((item, index) => {
              const selectedtypecount = item?.type?.filter(
                (t) => t.subOptionselected
              );
              const iscompletecheck =
                item.isCompulsory && selectedtypecount.length > 0;
              const remainCount = calculateToppingRemaining(item.optionId);

              // Deduplicate suboption categories
              const lstoption: Type[] = [];
              item.type?.forEach((data) => {
                if (
                  !lstoption.find(
                    (x) =>
                      x.suboptioncategoryname === data.suboptioncategoryname
                  )
                ) {
                  lstoption.push(data);
                }
              });

              const defaultselected = item.type.find(
                (x) => x.defaultSelection != null
              );

              return (
                <div className="col-lg-6 col-md-6 col-12" key={index}>
                  <div className="card mb-2 accordion-item">
                    <OptionHeader
                      remainCount={remainCount}
                      isOpenFirst={isOpenFirst}
                      item={item}
                      iscompletecheck={iscompletecheck}
                      isOnLoadExpand={isOnLoadExpand}
                      index={index}
                      selectedtypecount={selectedtypecount[0]}
                    />
                    <div
                      className={`card-body accordion-collapse collapse option-y ${
                        ((isOnLoadExpand &&
                          item.optionselected &&
                          selectedtypecount.length > 0) ||
                          (!isOnLoadExpand && index === 0 && isOpenFirst)) &&
                        "show"
                      }`}
                      id={`collapse${index}`}
                      aria-labelledby="accordionCrust"
                      data-bs-parent="#toppings-accordion"
                    >
                      <div className="row">
                        <SubToppingRequiredWarning
                          key={index}
                          item={item}
                          handleOnChangeRemoveSubOption={
                            handleOnChangeRemoveSubOption
                          }
                        />

                        {(lstoption.length > 1 ||
                          (lstoption.length === 1 &&
                            lstoption[0]?.suboptioncategoryname !==
                              "General")) && (
                          <ul className="nav nav-tabs mb-1 border-color-dynamic">
                            {lstoption.map((subcat) => {
                              const isActive =
                                defaultselected?.defaultSelection ===
                                subcat.suboptioncategoryname;

                              return (
                                <li
                                  key={`${item.optionId}-${subcat.suboptioncategoryname}`}
                                  className={`nav-item ${
                                    isActive ? "active" : ""
                                  }`}
                                >
                                  <a
                                    className={`nav-link fs-14 ${
                                      isActive &&
                                      defaultselected?.defaultSelection !==
                                        "all"
                                        ? "active border-color-dynamic border-none subcat-active"
                                        : "subcat-inactive"
                                    }`}
                                    onClick={() =>
                                      selectedOptionClick(
                                        item,
                                        subcat,
                                        subcat.suboptioncategoryname
                                      )
                                    }
                                  >
                                    {subcat.suboptioncategoryname}
                                  </a>
                                </li>
                              );
                            })}

                            {lstoption.length > 1 && (
                              <li className="nav-item">
                                <a
                                  className={`nav-link fs-14 ${
                                    defaultselected?.defaultSelection === "all"
                                      ? "active border-color-dynamic border-none subcat-active"
                                      : "subcat-inactive"
                                  }`}
                                  onClick={() =>
                                    selectedOptionClick(item, undefined, "all")
                                  }
                                >
                                  All
                                </a>
                              </li>
                            )}
                          </ul>
                        )}

                        {item.type.map((type, i) => {
                          const currentDefault = item.type.find(
                            (x) => x.defaultSelection != null
                          );
                          const shouldRender =
                            currentDefault?.defaultSelection ===
                              type.suboptioncategoryname ||
                            currentDefault?.defaultSelection === "all";

                          return (
                            shouldRender && (
                              <SubTopping
                                key={type.suboptionId}
                                index={i}
                                increment={increment}
                                decrement={decrement}
                                isDisplayPrice={isDisplayPrice}
                                type={type}
                                item={item}
                                handleOnChangeRemoveSubOption={
                                  handleOnChangeRemoveSubOption
                                }
                                handleOnChangeSubOption={
                                  handleOnChangeSubOption
                                }
                              />
                            )
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemOptions;
