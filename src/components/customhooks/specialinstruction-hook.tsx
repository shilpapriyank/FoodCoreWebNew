import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  setOrderDeliveryInstruction,
  setOrderInstruction,
} from "../../../redux/cart/cart.slice";

const useSpecialInstruction = (
  instructionMessage: string,
  deliveryInstructionMessage: string
) => {
  const [specialinstructions, setspecialinstructions] = useState<string>(
    instructionMessage == "" ? "" : instructionMessage
  );
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>(
    deliveryInstructionMessage == "" ? "" : deliveryInstructionMessage
  );

  const dispatch = useAppDispatch();

  const onBlurSpecialInstructions = () => {
    if (specialinstructions) {
      dispatch(setOrderInstruction(specialinstructions));
    }
  };

  const onBlurDeliveryInstruction = () => {
    if (deliveryInstructions)
      dispatch(setOrderDeliveryInstruction(deliveryInstructions));
  };

  const onChangeSpecialInstruction = (item: any) => {
    if (item != undefined) {
      setspecialinstructions(item.target.value);
    }
  };

  const onChangeDeliveryInstruction = (item: any) => {
    if (item != undefined) {
      setDeliveryInstructions(item.target.value);
    }
  };

  return {
    specialinstructions,
    deliveryInstructions,
    onChangeSpecialInstruction,
    onBlurSpecialInstructions,
    onBlurDeliveryInstruction,
    onChangeDeliveryInstruction,
  };
};

export default useSpecialInstruction;
