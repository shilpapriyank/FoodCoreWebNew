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
  let menuItemDetail = menuitem.menuitemdetaillist;
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

  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  const handleOnChangeRemoveSubOption = (
    item: Type,
    optionId: number,
    selection: string,
    isRadioButton?: boolean,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("selection from handleOnChangeSubOption", selection);
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

    const newArray = tdata?.map((a) =>
      Object.assign({}, a)
    );
    tdata?.map((data) => {
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
    let finalcount = calculateFinalCount(lstdefault, selectedoption?.[0]);
    var isMaxSelectZero =
      selectedoption?.[0].freeToppingsCount == 0 ? true : false;
    var checkCount =
      isMaxSelectZero == false
        ? finalcount <= selectedoption?.[0].freeToppingsCount
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
      console.log(updateWithPaidTopping);
      let freeCount = selectedoption?.[0].freeToppingsCount;
      const sortedsuboptionBasedSeqNo = updateWithPaidTopping?.sort(
        (a, b) => b.sequenceNumber - a.sequenceNumber
      );
      const notPaidSuboption = sortedsuboptionBasedSeqNo.filter(
        (sub) => !sub.isExtraPaidTopping && sub?.subOptionselected
      );
      let totalFreeCount = calculateFinalCount(
        notPaidSuboption,
        selectedoption?.[0]
      );
      const freeCountWithPaid = calculateFinalCountWithPaid(
        updateWithPaidTopping?.filter((sub) => sub.subOptionselected),
        selectedoption?.[0]
      );
      let reaminingTotalFreeCount = (freeCount as number) - freeCountWithPaid;
      console.log("freeCountWithPaid", freeCountWithPaid);
      const sub = sortedsuboptionBasedSeqNo.map((sub) => {
        let subOptioncount = calculateFinalCount([sub], selectedoption?.[0]);
        let remainCount = (freeCount as number) - subOptioncount;

        if (totalFreeCount <= remainCount && reaminingTotalFreeCount > 0) {
          const subOptionCount = calculateFinalCount(
            [sub],
            selectedoption?.[0]
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
              selectedoption?.[0]
            );
            sub.paidQty = subOptionCount - reaminingTotalFreeCount;
            reaminingTotalFreeCount = reaminingTotalFreeCount - sub.paidQty;
          }
        }
        //console.log("lstdefault from menuitem-options", lstdefault);
        return sub;
      });
    }

    let lstobj = {
      optionselected: selectedoption?.[0].optionselected,
      subparameterId: selectedoption?.[0].subparameterId,
      name: selectedoption?.[0].name,
      maxSelection: selectedoption?.[0].maxSelection,
      type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
    };

    //UPDATE THE LIST
    selectedtopping?.list.map((data) => {
      // if (data.optionselected === true) {
      //   data = lstobj;
      // } else {
      //   data = data;
      // }
      data.optionselected === true ? lstobj : data;
    });

    let objtopping = {
      subparameterId: selectedtopping?.subparameterId,
      list: selectedtopping?.list,
    };

    if (menuItemDetail) {
      menuItemDetail?.topping.map((data) => {
        // if (data.subparameterId === selectedsize?.subparameterId)
        //   data = objtopping;
        // else data = data;

        data.subparameterId === selectedsize?.subparameterId
          ? objtopping
          : data;
      });
      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail));
      //dispatch(selectedItemSize(menuItemDetail.size as Size[]));
      dispatch(updateitemoption());
      setreLoad(Math.random());
    }
  };

  const handleOnChangeSubOption = (
    item: Type,
    optionId: number,
    selection: string,
    isRadioButton: boolean,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    //let mutableItem = item as Mutable<typeof item>;
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
      //IF OPTION IS NO SELCTED  THEN SELECT THE OTION
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
      }
      //IF OPTION IS SELECTED THEN DESELECT FOR RADIO BUTTON ONLY
      else if (data.subOptionselected === true && isRadioButton === true) {
        if (isRadioButton === true) {
          const AnotherSubOptionSelected = tdata.find(
            (item) => item?.subOptionselected
          );
          let isSuboptionAlreadySelectedForPizza =
            AnotherSubOptionSelected?.suboptionId === data?.suboptionId;
          const isSelect =
            selection !== "" &&
            data.subOptionselected &&
            item.subOptionselected &&
            isSuboptionAlreadySelectedForPizza;
          data.subOptionselected = isSelect;
          data.subOptionToppingQuantity = isSelect ? 1 : 0;
          data.pizzaside = isSelect ? selection : "";
        }
      }
      //CHECK FOR THE HALF PIZZA SELECTION ONLY FOR THE CHECKBOX (FUNCTIONALITY FOR THE CHNAGE PIZZA SIDE)
      else if (selection !== "" && data?.subOptionselected && !isRadioButton) {
        data.subOptionselected = true;
        data.subOptionToppingQuantity = data.subOptionToppingQuantity;
        //chnage type
        data.pizzaside =
          data?.suboptionId === item?.suboptionId ? selection : data?.pizzaside;
      }
      lstdefault.push(data);
    });

    let finalcount: number = 0;
    finalcount = calculateFinalCount(lstdefault, selectedoption?.[0] as List);

    var isMaxSelectZero = isFreeCountCalculation
      ? selectedoption?.[0].freeToppingsCount == 0 ? true : false
      : selectedoption?.[0].maxSelection == 0 ? true : false;
    var checkCount = isFreeCountCalculation
      ? isMaxSelectZero == false
      ? finalcount <= Number(selectedoption?.[0].freeToppingsCount) ? true : false : true : isMaxSelectZero == false
      ? finalcount <= Number(selectedoption?.[0].maxSelection) ? true : false : true;
    //TODO:CHECKCOUNT IS FALSE THEN MAKE isExtraPaidTopping TRUE for that update the lstdefault array based on on
    //TODO:lso update the sequence number
    const selectedSubOption = lstdefault?.find(
      (sub) => sub.suboptionId === item?.suboptionId
    );
    var topvalue =
      selectedSubOption?.toppingValue === "" ? 1 : selectedSubOption?.toppingValue;
    var calculatedtopvalue = selectedoption?.[0].isHalfPizza === true && (selectedSubOption?.pizzaside === "L" ||
        selectedSubOption?.pizzaside === "R") ? (topvalue as number) * (selectedSubOption.halfPizzaPriceToppingPercentage ||
        selectedSubOption.halfPizzaPriceToppingPercentage === 0 ? 1: selectedSubOption.halfPizzaPriceToppingPercentage / 100) : topvalue;
    const subOptionCount =
      Number(selectedSubOption?.subOptionToppingQuantity) *
      Number(calculatedtopvalue);

    let updateWithPaidTopping;
    if (isFreeCountCalculation) {
      const topRecord = lstdefault.reduce((max, subOption) =>
        subOption.sequenceNumber > max.sequenceNumber ? subOption : max
      );
      console.log(topRecord);
      updateWithPaidTopping = lstdefault?.map((subOption) => {
        if (item.suboptionId === subOption.suboptionId) {
          subOption.sequenceNumber = topRecord?.sequenceNumber + 1;
          subOption.isExtraPaidTopping = !checkCount;
          if (subOption.isExtraPaidTopping) {
            subOption.paidQty =
              subOption.paidQty + 1 > subOption?.subOptionToppingQuantity ? subOption.paidQty : subOption.paidQty + 1;
          } else {
            subOption.paidQty = 0;
          }
          return subOption;
        } else {
          // subOption.isExtraPaidTopping = !checkCount
          if (!subOption.isExtraPaidTopping) {
            subOption.paidQty = 0;
          }
          return subOption;
        }
      });
    }
    const isValidMaxSelection = isFreeCountCalculation
      ? finalcount < Number(selectedoption?.[0].maxSelection)
      : finalcount <= Number(selectedoption?.[0].maxSelection);
    if (
      (item.subOptionselected === true &&
        isValidMaxSelection &&
        subOptionCount <= Number(selectedSubOption?.suboptionmaxselection)) ||
      isRadioButton
    ) {
      let lstobj = {
        optionselected: selectedoption?.[0].optionselected,
        subparameterId: selectedoption?.[0].subparameterId,
        name: selectedoption?.[0].name,
        maxSelection: selectedoption?.[0].maxSelection,
        type: isFreeCountCalculation ? updateWithPaidTopping : lstdefault,
      };
      //UPDATE THE LIST
      selectedtopping?.list.map((data) => {
       if (data.optionselected === true) {
          //data = lstobj;
          lstobj
        } else {
          data = data;
        }
      });

      let objtopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: selectedtopping?.list,
      };
      menuItemDetail?.topping.map((data) => {
        if (data.subparameterId === selectedsize?.subparameterId) 
         // data = objtopping;
          objtopping
        else data = data;
      });

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail as GetMenuItemDetail));
      dispatch(updateitemoption());
      setreLoad(Math.random);
    } else {
      // e.currentTarget.checked = false;
      if (selectedoption && selectedoption[0].maxSelection !== 0) {
        e.target.checked = false;
      }

      let lstobj = {
        optionselected: selectedoption?.[0].optionselected,
        subparameterId: selectedoption?.[0].subparameterId,
        name: selectedoption?.[0].name,
        maxSelection: selectedoption?.[0].maxSelection,
        type: newArray,
      };

      //Arun  assign old toppings, if max limit exceed of topping
      selectedtopping?.list.map((option) => {
        if (option.optionId === optionId) {
          Object.assign(option.type, newArray);
        }
      });

      let objtopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: selectedtopping?.list,
      };

      menuItemDetail?.topping.map((data) => {
        if (data.subparameterId === selectedsize?.subparameterId) {
          Object.assign(data, objtopping);
        } else {
          Object.assign(data, data);
        }
      });

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail as GetMenuItemDetail));
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
          "Select max " + selectedoption?.[0].maxSelection + " choices",
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

    let finalcount: number = 0;
    if (lstdefault && selectedoption?.[0]) {
      finalcount = calculateFinalCount(lstdefault, selectedoption[0]);
    }

    let isMaxSelectZero;
    if (selectedoption && selectedoption[0].maxSelection == 0)
      isMaxSelectZero = true;
    else isMaxSelectZero = false;
    let checkCount;
    if (isMaxSelectZero == false)
      if (isFreeCountCalculation) {
        checkCount =
          finalcount <= Number(selectedoption?.[0].freeToppingsCount) ||
          finalcount <= suboptionmaxselection ||
          finalcount <= Number(selectedoption?.[0].maxSelection) ? true : false;
      } else {
        checkCount =
          finalcount <= Number(selectedoption?.[0].maxSelection) ||
          finalcount <= suboptionmaxselection ? true : false;
      }
    // checkCount = (finalcount <= parseInt(selectedoption[0].maxSelection)) ? true : false
    else checkCount = true;
    const isExtraPaidTopping = !(
      finalcount <= Number(selectedoption?.[0].freeToppingsCount)
    );
    console.log(isExtraPaidTopping);
    //var isMaxSelectZero =  parseInt(selectedoption[0].maxSelection) == 0 ? true : false;
    //var checkCount = isMaxSelectZero == false ? finalcount <= parseInt(selectedoption[0].maxSelection) ? true : false : true;
    let updateWithPaidTopping: Type[];
    if (checkCount) {
      selectedtopping?.list.map((data) => {
        let type =
          selectedoption?.[0].optionId === data.optionId ? lstdefault : data.type;
        if (isFreeCountCalculation) {
          updateWithPaidTopping = type?.map((subOption) => {
            if (isExtraPaidTopping && suboptionId === subOption.suboptionId) {
              subOption.isExtraPaidTopping = isExtraPaidTopping;
              return subOption;
            } else {
              return subOption;
            }
          });

          let freeCount = selectedoption?.[0].freeToppingsCount;
          const isAllToppingPaid = updateWithPaidTopping
            ?.filter((sub) => sub.subOptionselected)
            ?.every((sub) => sub.isExtraPaidTopping);
          const sortedsuboptionBasedSeqNo = updateWithPaidTopping?.sort(
            (a, b) => b.sequenceNumber - a.sequenceNumber
          );

          const sub = sortedsuboptionBasedSeqNo.map((sub) => {
            let subOptioncount: number = 0;
            if (selectedoption) {
              subOptioncount = calculateFinalCount([sub], selectedoption?.[0]);
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
              // const paidQty=subOptioncount
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
        // console.log("sortedsuboptionBasedSeqNo", sortedsuboptionBasedSeqNo)
        let myobj = {
          optionselected: data.optionselected,
          subparameterId: data.subparameterId,
          name: data.name,
          maxSelection: data.maxSelection,
          type: isFreeCountCalculation
            ? updateWithPaidTopping
            : selectedtopping?.list,
        };
        // if (selectedoption?.[0].optionId === data.optionId) {
        //   data = myobj;
        // } else {
        //   data = data;
        // }
        if (selectedoption?.[0].optionId === data.optionId) {
          return myobj;
        } else {
          return data;
        }
      });
      let objtopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: selectedtopping?.list,
      };
      menuItemDetail?.topping.map((data) => {
        // if (data.subparameterId === selectedsize.subparameterId)
        //   data == objtopping;
        // else data = data;
        data.subparameterId === selectedsize?.subparameterId
          ? objtopping
          : data;
      });

      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail as GetMenuItemDetail));
      //dispatch(selectedItemSize(menuItemDetail?.size));
      dispatch(updateitemoption());
    } else {
      selectedtopping?.list.map((data) => {
        let type =
          selectedoption?.[0].optionId === data.optionId ? newArray : data.type;
        let lstobj = {
          optionselected: data.optionselected,
          subparameterId: data.subparameterId,
          name: data.name,
          maxSelection: data.maxSelection,
          type: type,
        };
        if (selectedoption?.[0].optionId === data.optionId)
          Object.assign(data, lstobj);
        else Object.assign(data, data);
      });
      let objtopping = {
        subparameterId: selectedtopping?.subparameterId,
        list: selectedtopping?.list,
      };

      menuItemDetail?.topping.map((data) => {
        if (data.subparameterId === selectedsize?.subparameterId)
          Object.assign(data, objtopping);
        else Object.assign(data, data);
      });
      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail as GetMenuItemDetail));
      //dispatch(selectedItemSize(menuItemDetail?.size));
      // handleNotify("Topping value is exceed " + selectedoption[0].maxSelection + " toppings", ToasterPositions.TopRight, ToasterTypes.Error);
      handleNotify(
        "Select max " + selectedoption?.[0].maxSelection + " choices",
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
      // handleNotify("Topping value is exceed " + selectedoption[0].maxSelection + " toppings", ToasterPositions.TopRight, ToasterTypes.Error);
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
        // handleNotify("Topping value is exceed " + data?.suboptionmaxselection + " toppings", ToasterPositions.TopRight, ToasterTypes.Error);
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

  // TODO: DISPLAY INTHE 0.5 TO 1/2
  function gcd(a: number, b: number) {
    if (a == 0) return b;
    else if (b == 0) return a;
    if (a < b) return gcd(a, b % a);
    else return gcd(b, a % b);
  }

  function improperFractionToMixedNumber(n: number, d: number) {
    let i = n / d;
    n -= i * d;
    return [i, n, d];
  }

  function decimalToFraction(number: number) {
    let letVal = Math.floor(number); //1
    let fVal = number - letVal; //0
    let pVal = 10;
    let gcdVal = gcd(Math.round(fVal * pVal), pVal);
    let num = Math.round(fVal * pVal) / gcdVal;
    let deno = pVal / gcdVal;
    let numberVal = letVal * deno + num;
    let result = improperFractionToMixedNumber(numberVal, deno);
    if (result[1] > 0) {
      return (
        <>
          {result[0] > 0 ? result[0] : ""}&nbsp;
          <sup>{result[1]}</sup>/<sub>{result[2]}</sub>
        </>
      );
    } //Remaining amount display as minus amount
    else if (result[0] < 0) {
      return 0;
    } else {
      return result[0];
    }
  }

  const calculateToppingRemaining = (optionId: number) => {
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

    if (finalcount <= Number(selectedoption?.[0].maxSelection)) {
      // settoppingremaining(selectedoption[0].maxSelection - finalcount);
      return decimalToFraction(
        Number(selectedoption?.[0].maxSelection) - finalcount
      );
    }
  };

  const selectedOptionClick = (
    option: List,
    item: Type | null,
    alltype: string
  ) => {
    console.log(
      "option from selectedoptionClick from menuitem options",
      option
    );
    console.log("item from selectedoptionClick from menuitem options", item);
    console.log(
      "alltype from selectedoptionClick from menuitem options",
      alltype
    );
    let lstdefault: Type[] = [];
    option.type.map((data) => {
      let newData = { ...data };
      if (alltype !== "all") {
        // if (item?.suboptioncategoryname == data.suboptioncategoryname)
        //   data.defaultSelection = item.suboptioncategoryname;
        // else data.defaultSelection = "";
        newData.defaultSelection =
          item?.suboptioncategoryname === data.suboptioncategoryname
            ? item.suboptioncategoryname
            : "";
      } else {
        //data.defaultSelection = "all";
        newData.defaultSelection = "all";
      }
      //lstdefault.push(data);
      lstdefault.push(newData);
    });
    let lstobj = {
      optionselected: option.optionselected,
      subparameterId: option.subparameterId,
      name: option.name,
      maxSelection: option.maxSelection,
      type: lstdefault,
    };
    selectedtopping?.list.map((data) => {
      // if (data.optionselected === true) data = lstobj;
      // else data = data;
      data.optionselected === true ? lstobj : data;
    });
    let objtopping = {
      subparameterId: selectedtopping?.subparameterId,
      list: selectedtopping?.list,
    };

    menuItemDetail?.topping.map((data) => {
      // if (data.subparameterId === selectedsize?.subparameterId)
      //   data = objtopping;
      // else data = data;
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
                <div className="col-lg-6 col-md-6 col-12" key={item.optionId}>
                  <div className="card mb-2 accordion-item">
                    <OptionHeader
                      remainCount={
                        typeof remainCount === "number" ? remainCount : 0
                      }
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
                          key={item.optionId}
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
