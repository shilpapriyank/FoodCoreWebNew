import React from 'react'

const SubToppingPrice = ({ type, isDisplayPrice, isExtraPaidTopping } :any) => {
    return (
        <>
            {(type?.price !== undefined && type?.price > 0 && isDisplayPrice && isExtraPaidTopping) &&
                <span className="color-green ml-2">
                    {type.currency}{type.price.toFixed(2)}
                </span>
            }
        </>
    )
}

export default SubToppingPrice
