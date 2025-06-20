import React from 'react'

const PizzaSlice = ({ type, handleOnChangeSubOption, isRadioButton = false, optionId }: any) => {
    return (
        <div className="sun">
            <a className={`ft  cursor-pointer ${type?.pizzaside === "L" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "L", isRadioButton, e)} />
            <a className={`sd cursor-pointer ${type?.pizzaside === "F" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "F", isRadioButton, e)} />
            <a className={`td cursor-pointer ${type?.pizzaside === "R" ? "active " : ""}`} onClick={(e) => handleOnChangeSubOption(type, optionId, "R", isRadioButton, e)} />
        </div>
    )
}

export default PizzaSlice
