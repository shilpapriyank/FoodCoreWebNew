"use client";

import { useEffect } from "react";
import $ from "jquery";
import "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css";
import "bootstrap";
import "eonasdan-bootstrap-datetimepicker";
import { MERIDIEM_TIME_ENUM } from "./utility";

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

  //   useEffect(() => {
  //     const element = $("#datetimepicker4");
  //     if (!element.length || isDisabled || !hour || !minute || !meridiem) return;

  //     const parsedHour =
  //       meridiem === "AM"
  //         ? parseInt(hour)
  //         : parseInt(hour) + 12 === 24
  //         ? 12
  //         : parseInt(hour) + 12;

  //     const time = `${parsedHour}:${parseInt(minute)}`;

  //     element
  //       .datetimepicker({
  //         format: "LT",
  //         inline: true,
  //       })
  //       .on("dp.change", () => {
  //         setTimeOrErrorMessage("");
  //         setIsConfirmDisable(false);
  //       });

  //     element.data("DateTimePicker").date(time, "HH:mm");
  //   }, [hour, minute, meridiem, isDisabled]);

  return <div className="d-block mx-auto" id="datetimepicker4" />;
}
