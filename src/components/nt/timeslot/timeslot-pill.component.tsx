import React from "react";
import { TimeSlot } from "@/types/timeslot-types/timeslot.types";

export const TimeSlotPillComponent = ({
  time,
  id,
  handleChange,
  selectedTime,
  handleClickTimePill,
  label,
  isDisable = false,
}: {
  time: TimeSlot;
  id: string | number;
  handleChange?: () => void;
  selectedTime: string;
  handleClickTimePill: (time: TimeSlot) => void;
  label: string;
  name: string;
  isDisable?: boolean;
}) => {
  return (
    <div
      className={`col-12 shadow p-2 border-bottom  border-light border-5  ${
        isDisable ? "cursor-nodrop opacity-50" : "cursor"
      }`}
      onClick={() => {
        handleClickTimePill(time);
      }}
    >
      <div className="form-check">
        <div className="row">
          <div className="col-12 position-relative">
            <p className="form-check-label text-dark fw-semibold fs-6 time-pill">
              {label}
              <input
                onChange={() => {}}
                disabled={isDisable}
                checked={
                  selectedTime === `${time.StartSlotNew} - ${time.EndSlotNew}`
                }
                className="time-slot-radio form-check-input position-absolute top-0 right-20 "
                type="radio"
                name={`A`}
                id="flexRadioDefault1 "
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
