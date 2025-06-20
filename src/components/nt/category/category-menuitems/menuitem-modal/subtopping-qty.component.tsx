import React from 'react'

const SubToppingQty = ({ increment, decrement, type, optionId, index, isRadioButton, option, handleOnChangeSubOption }: any) => {
    const qty = type.subOptionToppingQuantity
    return (
        <div className="d-flex ms-auto align-items-center">
            <div className="quantity normal qty-container roundstyle">
                <button type='button'  className={type.subOptionToppingQuantity > 0 ? "qty-btn-minus btn-light quantity__minus" : "qty-btn-minus btn-light quantity__minus"} onClick={() => decrement(optionId, type,isRadioButton)}>     <i className="fa fa-minus" /></button>
                <input data-value name="qty" readOnly value={qty} className="input-qty quantity__input" />
                <button  type='button'  className='qty-btn-plus btn-light quantity__plus' onClick={() => increment(optionId, type, type.subOptionToppingQuantity)}> <i className="fa fa-plus" /></button>
            </div>
        </div>
    )
}

export default SubToppingQty
