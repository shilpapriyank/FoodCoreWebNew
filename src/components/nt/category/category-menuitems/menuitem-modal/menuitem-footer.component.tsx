import React, { ReactNode } from "react";

const MenuItemFooter: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="modal-footer">
      <div className="row m-auto">
        <div className="col-lg-12 ms-auto col-md-12 col-12">
          <div className="row ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemFooter;
