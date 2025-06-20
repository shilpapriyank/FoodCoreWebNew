import React from "react";

const MenuItemQty = ({ increment, decrement, currentQty }: any) => {
  return (
    <div className="col-lg-4 p-0 col-md-5 col-6 pb-1 pb-md-0 label-bg mb-1 mb-md-0">
      <div className="quantity qty-container side-qty-btn ">
        <button
          className="qty-btn-minus btn-light quantity__minus"
          type="button"
          onClick={decrement}
        >
          <i className="fa fa-minus" />
        </button>
        <input
          type="text"
          name="qty"
          value={currentQty}
          readOnly
          className="input-qty quantity__input"
        />
        <button className="qty-btn-plus btn-light quantity__plus" type="button">
          <i className="fa fa-plus" onClick={increment} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemQty;
