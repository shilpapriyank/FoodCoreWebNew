import React, { useState, useRef, useEffect } from "react";

const Popover = ({ children, content, position = "bottom" }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);

  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="popover-container">
      <div ref={triggerRef} className="popover-trigger" onClick={togglePopover}>
        {children}
      </div>
      {isOpen && (
        <>
          <div
            ref={popoverRef}
            className={`popover-content  popover-${position}`}
          >
            {content}
          </div>
          <i className="fa fa-caret-down"></i>
        </>
      )}
    </div>
  );
};

export default Popover;
