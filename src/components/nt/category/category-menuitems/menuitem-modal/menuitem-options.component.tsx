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
  Size,
  Type,
} from "@/types/menuitem-types/menuitem.type";
import {
  removeMenuItem,
  selectedItemSize,
  updateitemoption,
} from "../../../../../../redux/menu-item/menu-item.slice";
import ToastNotify from "@/components/nt/helpers/toastnotify/toast-notify.component";
import { isDataView } from "node:util/types";
import { InputOrClickEvent } from "@/types/event-types/inputclickevent-type";

const MenuItemOptions = ({
  isExpand,
  isLoad,
  count,
}: {
  isExpand: boolean;
  isLoad: boolean;
  count: number;
}) => {
  const { menuitem } = useReduxData();
  const dispatch = useAppDispatch();
  // let updateitemoptionincart = useSelector(({ updateitemoptionincart }) => updateitemoptionincart, shallowEqual);
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
        x.subparameterId === selectedsize?.subparameterId &&
        x.optionId === optionId
    );

    let tdata = selectedoption?.[0]?.type;

    const newArray = tdata?.map((a) => Object.assign({}, a));

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

    let updateWithPaidTopping;
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
      let reaminingTotalFreeCount = (freeCount as number) - freeCountWithPaid;
      const sub = sortedsuboptionBasedSeqNo.map((sub) => {
        let subOptioncount = calculateFinalCount([sub], updatedSelectedOption);
        let remainCount = (freeCount as number) - subOptioncount;

        if (totalFreeCount <= remainCount && reaminingTotalFreeCount > 0) {
          const subOptionCount = calculateFinalCount(
            [sub],
            updatedSelectedOption
          );
          if (subOptionCount <= reaminingTotalFreeCount)
            reaminingTotalFreeCount = reaminingTotalFreeCount - subOptionCount;
          sub.isExtraPaidTopping = false;
          sub.paidQty = 0;
          // if(reaminCount)
          //update the count make extratopping false
        } else if (
          freeCount &&
          subOptioncount > freeCount &&
          reaminingTotalFreeCount > 0 &&
          sub.isExtraPaidTopping
        ) {
          if (sub.paidQty > reaminingTotalFreeCount) {
            // change above condition if need
            sub.paidQty = sub.paidQty - reaminingTotalFreeCount;
            // }
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
            //  if()
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
    let newArray = tdata?.map((a) => Object.assign({}, a));

    tdata?.map((data) => {
      data = { ...data };

      if (item.name === data.name && item.subOptionselected === false) {
        let selectionTypeTopizzaSide =
          selection === "select"
            ? selectedoption?.[0]?.isHalfPizza
              ? "F"
              : ""
            : selection === "deselect"
            ? ""
            : selection;

        item.subOptionselected = true;
        data.subOptionselected = true;
        data.subOptionToppingQuantity = 1;
        data.pizzaside = selectionTypeTopizzaSide;
      } else if (data.subOptionselected === true && isRadioButton === true) {
        const anotherSelected = tdata?.find((item) => item.subOptionselected);
        const isSame = anotherSelected?.suboptionId === data.suboptionId;

        const isSelect =
          selection !== "" &&
          data.subOptionselected &&
          data.subOptionselected &&
          isSame;

        data.subOptionselected = isSelect;
        data.subOptionToppingQuantity = isSelect ? 1 : 0;
        data.pizzaside = isSelect ? selection : "";
      } else if (selection !== "" && data.subOptionselected && !isRadioButton) {
        data.subOptionselected = true;
        data.pizzaside =
          data?.suboptionId === item?.suboptionId ? selection : data?.pizzaside;
      }

      lstdefault.push(data);
    });

    //to update the selectedoption.type
    let updatedSelectedOption = {
      ...(selectedoption?.[0] as List), //make copy of old selectedoption
      type: lstdefault, //assign lstdefault to type that hold the new updated type
    };

    let finalcount: number = 0;
    finalcount = calculateFinalCount(lstdefault, updatedSelectedOption);

    var isMaxSelectZero = isFreeCountCalculation
      ? updatedSelectedOption.freeToppingsCount == 0
        ? true
        : false
      : updatedSelectedOption.maxSelection == 0
      ? true
      : false;
    var checkCount = isFreeCountCalculation
      ? isMaxSelectZero == false
        ? finalcount <= Number(updatedSelectedOption.freeToppingsCount)
          ? true
          : false
        : true
      : isMaxSelectZero == false
      ? finalcount <= Number(updatedSelectedOption.maxSelection)
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
        selectedSubOption?.pizzaside === "L") ||
      selectedSubOption?.pizzaside === "R"
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

    let updateWithPaidTopping;
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
      ? finalcount < Number(updatedSelectedOption.maxSelection)
      : finalcount <= Number(updatedSelectedOption.maxSelection);
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
      setreLoad(Math.random);
    } else {
      // e.currentTarget.checked = false;
      if (updatedSelectedOption.maxSelection !== 0) {
        if (e.target instanceof HTMLInputElement) {
          let checked = e.target.checked;
          checked = false;
        }
        // e.target.checked = false;
      }

      let lstobj = {
        optionselected: updatedSelectedOption.optionselected,
        subparameterId: updatedSelectedOption.subparameterId,
        name: updatedSelectedOption.name,
        maxSelection: updatedSelectedOption.maxSelection,
        type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
      };

      const updatedList = selectedtopping?.list.map((data) => {
        if (data.optionselected === true) {
          return lstobj;
        } else {
          return data;
        }
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
      if (
        selectedSubOption &&
        subOptionCount > selectedSubOption?.suboptionmaxselection
      ) {
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
    operator: any
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
      // selectedquantityClickOld(optionId, quantity, suboptionId, operator)
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
      //data.suboptionmaxselection
      if (data.suboptionId === suboptionId) {
        if (data.subOptionselected === false) {
          data.subOptionToppingQuantity = 0;
          data.isExtraPaidTopping = false;
        } else {
          data.subOptionToppingQuantity = quantity;
          // sub option max selection functionality
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
        if (updatedSelectedOption.optionId === data.optionId)
          Object.assign(data, lstobj);
        else Object.assign(data, data);
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

  const increment = (optionId: number, data: any) => {
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
        data.toppingValue === "" || parseInt(data.toppingValue) === 0
          ? 1
          : parseInt(data.toppingValue);
      var calculatedtopvalue =
        selectedoption?.[0].isHalfPizza === true &&
        (data.pizzaside === "L" || data.pizzaside === "R")
          ? topvalue *
            (data.halfPizzaPriceToppingPercentage === "" ||
            parseInt(data.halfPizzaPriceToppingPercentage) === 0
              ? 1
              : parseInt(data.halfPizzaPriceToppingPercentage) / 100)
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
        data.toppingValue === "" || parseInt(data.toppingValue) === 0
          ? 1
          : parseInt(data.toppingValue);
      var calculatedtopvalue =
        selectedoption?.[0].isHalfPizza === true &&
        (data.pizzaside === "L" || data.pizzaside === "R")
          ? topvalue *
            (data.halfPizzaPriceToppingPercentage === "" ||
            parseInt(data.halfPizzaPriceToppingPercentage) === 0
              ? 1
              : parseInt(data.halfPizzaPriceToppingPercentage) / 100)
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

  const decrement = (optionId: number, data: any, isRadioButton: boolean) => {
    if (minQty === data.subOptionToppingQuantity) {
      selectedquantityClick(optionId, minQty, data.suboptionId, "-");
      return;
    }
    const minusState = data.subOptionToppingQuantity - 1;
    if (minusState === 0) {
      handleOnChangeRemoveSubOption(data, optionId, "deselect");
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
    item: Type | null,
    alltype: string
  ) => {
    let lstdefault: Type[] = [];
    option.type.map((data) => {
      data = { ...data };
      if (alltype !== "all") {
        data.defaultSelection =
          item?.suboptioncategoryname === data.suboptioncategoryname
            ? item.suboptioncategoryname
            : "";
      } else {
        data.defaultSelection = "all";
      }
      lstdefault.push(data);
    });
    let lstobj = {
      optionselected: option.optionselected,
      subparameterId: option.subparameterId,
      name: option.name,
      maxSelection: option.maxSelection,
      type: lstdefault,
    };
    selectedtopping?.list.map((data) => {
      data.optionselected === true ? lstobj : data;
    });
    let objtopping = {
      subparameterId: selectedtopping?.subparameterId,
      list: selectedtopping?.list,
    };

    menuItemDetail?.topping.map((data) => {
      data.subparameterId === selectedsize?.subparameterId ? objtopping : data;
    });
    dispatch(removeMenuItem());
    dispatch(selectedItemSize(menuItemDetail as GetMenuItemDetail));
    //dispatch(selectedItemSize(menuItemDetail.size as Size[]));
    dispatch(updateitemoption());
  };

  const handleClickSubOptionAll = () => {};
  return (
    <>
      {selectedtopping?.list && (
        <div className="accordion" id="toppings-accordion">
          <div className="row">
            {selectedtopping.list.map((item, index) => {
              let selectedtypecount = item?.type?.filter(
                (item) => item.subOptionselected === true
              );
              let iscompletecheck =
                item.isCompulsory && selectedtypecount.length > 0;
              const remainCount = calculateToppingRemaining(item?.optionId);
              let lstoption: Type[] = [];
              let defaultselected =
                item?.type != undefined &&
                item?.type.length > 0 &&
                item.type.filter((x) => x.defaultSelection != null);
              let optiontype =
                item != undefined &&
                item.type.map((data) => {
                  if (
                    lstoption.length === 0 ||
                    lstoption.find(
                      (x) =>
                        x.suboptioncategoryname === data.suboptioncategoryname
                    ) === undefined
                  )
                    lstoption.push(data);
                });
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
                          item?.optionselected === true &&
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
                        <>
                          {(lstoption.length > 1 ||
                            (lstoption.length === 1 &&
                              lstoption[0]?.defaultSelection !==
                                "General")) && (
                            <ul className="nav nav-tabs mb-1 border-color-dynamic">
                              {lstoption &&
                                lstoption?.map((subcat) => {
                                  let defaultselected =
                                    lstoption != undefined &&
                                    lstoption.length > 0 &&
                                    lstoption.find(
                                      (x) => x.defaultSelection != null
                                    );
                                  return (
                                    <li
                                      key={`${item.optionId}-${subcat.suboptioncategoryname}`}
                                      className={`nav-item ${
                                        defaultselected &&
                                        defaultselected?.defaultSelection ===
                                          subcat?.suboptioncategoryname
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      {" "}
                                      <a
                                        className={`nav-link fs-14 ${
                                          defaultselected &&
                                          defaultselected?.suboptioncategoryname ===
                                            subcat?.suboptioncategoryname &&
                                          defaultselected?.defaultSelection !==
                                            "all"
                                            ? "active border-color-dynamic border-none subcat-active"
                                            : "subcat-inactive"
                                        }`}
                                        onClick={() =>
                                          selectedOptionClick(
                                            item,
                                            subcat,
                                            subcat?.suboptioncategoryname
                                          )
                                        }
                                      >
                                        {subcat?.suboptioncategoryname}
                                      </a>
                                    </li>
                                  );
                                })}

                              {lstoption.length > 1 && (
                                <li className={`nav-item `}>
                                  {" "}
                                  <a
                                    className={`nav-link fs-14 ${
                                      defaultselected &&
                                      defaultselected[0]?.defaultSelection ===
                                        "all"
                                        ? `active border-color-dynamic border-none subcat-active`
                                        : "subcat-inactive"
                                    }`}
                                    onClick={() =>
                                      selectedOptionClick(item, null, "all")
                                    }
                                  >
                                    All
                                  </a>
                                </li>
                              )}
                            </ul>
                          )}
                        </>
                        {item?.type?.map((type, index) => {
                          let defaultselected = item?.type.find(
                            (x) => x.defaultSelection != null
                          );
                          const isInSuboptionCat =
                            defaultselected?.defaultSelection ===
                              type?.suboptioncategoryname ||
                            defaultselected?.defaultSelection === "all";
                          return (
                            <React.Fragment key={index}>
                              {isInSuboptionCat ? (
                                <SubTopping
                                  //lstoption={lstoption}
                                  //option={item}
                                  index={index}
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
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
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
      <ToastNotify />
    </>
  );
};

export default MenuItemOptions;
