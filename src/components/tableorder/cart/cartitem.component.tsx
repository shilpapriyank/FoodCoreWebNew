import React from 'react';
import CartItemTopping from './cartitem-topping.component';

interface Option {
    [key: string]: any; // You can replace `any` with a stricter type when available
}

interface Size {
    [typeId: string]: {
        Options: Option;
    };
}

interface CartItem {
    id: string;
    menuItemName: string;
    total: number;
    qty: number;
    Size?: Size;
    typeId?: string;
}

interface CartItemComponentProps {
    id: string;
    item: CartItem;
    currency: string;
    image: string;
    incrementQty: (qty: number, id: string, total: number) => void;
    decrementQty: (qty: number, id: string, total: number) => void;
    removeCartItem: (id: string) => void;
    handleClickEdit: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
    id,
    item,
    currency,
    incrementQty,
    decrementQty,
    removeCartItem,
    handleClickEdit,
    image
}) => {
    const options = item?.Size?.[item?.typeId || '']?.Options;

   return (
        <div className="topping-item d-flex  align-items-center justify-content-between mt-1" key={id}>
            <figure style={{ background: `url(${image}) 50% 50% no-repeat`, backgroundSize: "cover" }} />
            <div className="rinf">
                <div className="d-flex align-items-center">
                    <div className="topping-name">
                        <h6 className="font12 mb-0">{item.menuItemName}</h6>
                    </div>
                    <div className="topping-name d-flex align-items-center ms-auto">
                        <a className="edit-prod-details mt-1"><img src="/to/img/icon_edit.png" data-bs-dismiss="modal" onClick={() => handleClickEdit(id)} /></a>
                        <a className="ms-2"><i className="fa icon-delete font12 fa-trash" onClick={() => { removeCartItem(id) }} /></a>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="topping-price">{currency}{item.total}</div>
                    <div className="topping-add ms-auto">
                        <a className={`item-desc ${item.qty === 1 ? "pe-none" : ""}`}><img src="/to/img/icon_minus.png" className={item.qty === 1 ? "pe-none disable-img" : ""} onClick={() => decrementQty(item.qty, id, item.total)} /></a>
                        <input type="text" readOnly value={item.qty} className="item-qty" />
                        <a onClick={() => incrementQty(item.qty, id, item.total)} className="item-inc"><img src="/to/img/icon_add_solid.png" /></a>
                    </div>
                </div>
                {options && <CartItemTopping toppingList={Object.values(options)} />}
            </div>
        </div>

    )
};

export default CartItemComponent;
