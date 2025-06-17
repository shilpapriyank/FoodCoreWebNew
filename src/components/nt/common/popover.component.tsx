import React, { useEffect, useRef, useState } from "react";
import { decodeNTimes, fixedLengthString } from "./utility";
import { Popover } from "bootstrap";

export const PopOver = React.memo(
  ({ description }: { description: string }) => {
    const popoverRef = useRef(null);
    const [isPopOver, setisPopOver] = useState(false);

    useEffect(() => {
      if (popoverRef && description !== "") {
        getpopover(popoverRef, description);
      }
    }, [description]);

    const handleClick = () => {
      setisPopOver(!isPopOver);
    };
    return (
      // <span className="text-center" >
      <span className="text-center">
        {fixedLengthString(description, 100, "")}
        <button
          ref={popoverRef}
          onClick={handleClick}
          className=" bg-white text-underline"
        >
          {" "}
          See more{" "}
        </button>
      </span>
    );
  }
);

export const getpopover = (popoverRef: any, description = "") => {
  const decodedDesc = decodeNTimes(description, 5);
  var popover = new Popover(popoverRef.current, {
    html: true,
    content: `${decodedDesc && `<p>${decodedDesc}</p>`}`,
    title: "Description",
    trigger: "focus",
    placement: "top",
  });
};

// export const triggerpopover = (title, ref, content) => {
//     const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
//     const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
// }
