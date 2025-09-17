"use client";

import { useEffect } from "react";
import $ from "jquery";
import "moment";
import "bootstrap/dist/css/bootstrap.min.css"; // required for datetimepicker styling
import "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css";
import "bootstrap"; // required before datetimepicker
import "eonasdan-bootstrap-datetimepicker"; // now resolved
import { MERIDIEM_TIME_ENUM } from "./enums";

interface Props {
  hour: string;
  minute: string;
  meridiem: MERIDIEM_TIME_ENUM;
  isDisabled: boolean;
  setTimeOrErrorMessage: (msg: string) => void;
  setIsConfirmDisable: (val: boolean) => void;
}

export default function DateTimePickerWrapper({
  hour,
  minute,
  meridiem,
  isDisabled,
  setTimeOrErrorMessage,
  setIsConfirmDisable,
}: Props) {
  
  useEffect(() => {
    if (
      document.getElementById("datetimepicker4") !== null &&
      document.getElementById("datetimepicker4") !== undefined
    ) {
      let Hour =
        meridiem === MERIDIEM_TIME_ENUM.AM
          ? parseInt(hour)
          : parseInt(hour) + 12 === 24
          ? 12
          : parseInt(hour) + 12;
      let Time = `${Hour}:${parseInt(minute)}`;

      $("#datetimepicker4")
        ?.datetimepicker({
          format: "LT",
          inline: true,
        })
        .on("dp.change", function (ev) {
          setTimeOrErrorMessage("");
          setIsConfirmDisable(false);
        });
      $("#datetimepicker4")?.data("DateTimePicker").date(Time, "HH:mm");
    }
  }, [document.getElementById("datetimepicker4")]);

  return <div className="d-block mx-auto" id="datetimepicker4" />;
}
