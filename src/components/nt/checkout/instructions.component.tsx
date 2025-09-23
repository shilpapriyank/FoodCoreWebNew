import React, { FocusEvent, useState } from "react";
import { ORDERTYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import useSpecialInstruction from "@/components/customhooks/specialinstruction-hook";

const Instructions = () => {
  const { cart, selecteddelivery } = useReduxData();
  const instruction =
    cart?.orderinstruction && cart.orderinstruction == ""
      ? ""
      : cart.orderinstruction;
  const deliveryinstructionmsg = cart.orderdeliveryinstruction ?? "";
  const [isFocus, setisFocus] = useState(false);
  const [isNoteFocus, setisNoteFocus] = useState(false);
  let pickupordelivery = selecteddelivery.pickupordelivery;

  const {
    specialinstructions,
    onBlurSpecialInstructions,
    onChangeSpecialInstruction,
    deliveryInstructions,
    onBlurDeliveryInstruction,
    onChangeDeliveryInstruction,
  } = useSpecialInstruction(instruction, deliveryinstructionmsg);

  const handleOnBlurDeliveryInstruction = (
    e: FocusEvent<HTMLTextAreaElement>
  ) => {
    setisFocus(false);
  };

  const onFocusInput = (e: FocusEvent<HTMLTextAreaElement>) => {
    setisFocus(true);
  };

  const handleOnBlurSpecialInstructions = (
    e: FocusEvent<HTMLTextAreaElement>
  ) => {
    onBlurSpecialInstructions();
    setisNoteFocus(false);
  };
  
  return (
    <>
      {pickupordelivery === ORDERTYPE.Delivery && (
        <>
          <h3 className="heading">Delivery Instructions For Driver</h3>
          {/* <label>Delivery Instructions For Driver</label> */}
          <textarea
            className="form-control"
            id={`${!isFocus ? "sidebar-textarea" : ""}`}
            value={deliveryInstructions}
            onChange={(e) => onChangeDeliveryInstruction(e)}
            onFocus={() => setisFocus(true)}
            onBlur={(e) => handleOnBlurDeliveryInstruction(e)}
          />

          <small className="fs-10 ">
            (Note: Gate code, ring the door bell, etc.)
          </small>
          <hr className="my-1" />
        </>
      )}
      <h3 className="heading">Add a note</h3>
      {/* <label>Kitchen Instructions For Driver</label> */}
      <textarea
        className="form-control mb-2"
        value={specialinstructions}
        id={`${!isNoteFocus ? "sidebar-textarea" : ""}`}
        onChange={(e) => onChangeSpecialInstruction(e)}
        onBlur={(e) => handleOnBlurSpecialInstructions(e)}
        onFocus={() => setisNoteFocus(true)}
      />
      {/* <hr className="m"/> */}
    </>
  );
};
export default Instructions;
