'use client';

import React, { useEffect, useState } from 'react';
import CartItemComponent from './cartitem.component';
import {
    generateTableName,
    getImagePath,
    getMenuItemdetailFormate,
    NotificationSettingTypes,
    pushNotificationType
} from '../../common/utility';
import { API_RESPONSE_STATUS } from '../../common/enums';
import handleNotify from '../../default/helpers/toaster/toaster-notify';
import { ToasterPositions } from '../../default/helpers/toaster/toaster-positions';
import { ToasterTypes } from '../../default/helpers/toaster/toaster-types';
import { ref, update } from 'firebase/database';
import { useAppDispatch } from '../../../../redux/hooks';
import { MenuItemTypes } from '../../../../redux/menu-item/menuitem.type';
import { CategoryServices } from '../../../../redux/category/category.services';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import db from '../firebase/db';
import useManageCartData from '../customhooks/managecartitem.hook';
import MenuItemDetails from '../common/getmenuitemdetail';
import { selecteditemquantity } from '../../../../redux/menu-item/menu-item.slice';
import { addKitchenComment } from '../../../../redux/tableorder/tableorder.slice';
import { TableOrderServices } from '../../../../redux/tableorder/tableorder.services';

interface CartDetailsProps {
    handleClose: (val: boolean) => void;
}

const CartDetailsComponent: React.FC<CartDetailsProps> = ({ handleClose }) => {
    const { menuitem, restaurantinfo, tableorder, userinfo, main } = useReduxData();
    const { getCartItems, incrementQty, decrementQty, removeCartItem, updateProperty } = useManageCartData();
    const cartData = tableorder.cartitems;
    const tableDetail = tableorder.tabledetail;
    const [note, setNote] = useState<string>(tableorder.kitchencomment || '');
    const collectionName = generateTableName(
        restaurantinfo?.restaurantId,
        restaurantinfo?.defaultlocationId,
        process.env.NEXT_PUBLIC_ENV
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        getCartItems();
    }, []);

    const handleClickEdit = async (id: string) => {
        const editItem = cartData[id];
        (document.querySelector('.edit-btn') as any)?.click();

        const response = await CategoryServices.getCategoryItemListPOS(
            restaurantinfo?.restaurantId,
            //   true,
            //   editItem.catId,
            //   userinfo ? userinfo.customerId : 0,
            //   restaurantinfo.defaultlocationId
        );

        if (response) {
            const editMenuItem = response.find((item: any) => item.menuitemId === editItem.menuitemId);
            const formattedMenuItem = getMenuItemdetailFormate(editMenuItem);
            const menuItem = new MenuItemDetails({}, formattedMenuItem, editItem);
            const menuItemCategory = main?.maincategoryList?.find((item: any) => item?.catId === editItem.catId);
            menuItem.geteditObjToEditMenuitem();
            editMenuItem.catSortOrder = (menuItemCategory as any)?.sortorder;
            editMenuItem.editId = id;

            dispatch({
                type: MenuItemTypes.SELECTED_MENU_ITEM_DATA,
                payload: editMenuItem
            });
            dispatch({
                type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
                payload: (menuItem as any).editMenuitem
            });
            dispatch(selecteditemquantity(editItem.qty));
        }

        handleClose(false);
    };

    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const onBlurComment = () => {
        dispatch(addKitchenComment(note));
        updateProperty('kitchenComments', note);
    };

    const handleClickAddToKitchenCopy = () => {
        TableOrderServices.sendTablePushnotification(
            restaurantinfo?.defaultlocationId,
            restaurantinfo?.restaurantId,
            tableDetail?.tableno,
            `${tableDetail?.tableId}`,
            NotificationSettingTypes.POS,
            (pushNotificationType as any).TABLE_SEND_TO_KITCHEN
        ).then((res) => {
            if (res?.status === API_RESPONSE_STATUS.SUCCESS) {
                handleNotify('Order sent to kitchen successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
                const updates: Record<string, boolean> = {};
                updates[`${collectionName}/${tableorder?.tabledetail?.tableId}/isToSetCurrentDeviceTag`] = false;
                update(ref(db), updates);
                (document.querySelector('.btn-close') as any)?.click();
            }
        });
    };

    return (
        <div className="modal-content">
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleClose(false)}
            ></button>
            <div className="modal-body">
                <div className="prod-details">
                    <div className="prod-info">
                        <h5 className="font12">Your Order Summary</h5>
                    </div>
                </div>
                <div className="prod-variation">
                    {cartData &&
                        Object.entries(cartData).map(([key, value]) => {
                            const image = getImagePath((value as any)?.imgUrl, restaurantinfo?.defaultLocation?.defaultmenuitemimage);
                            return (
                                <CartItemComponent
                                    key={key}
                                    image={image}
                                    incrementQty={incrementQty}
                                    handleClickEdit={handleClickEdit}
                                    decrementQty={decrementQty}
                                    removeCartItem={removeCartItem}
                                    id={key}
                                    item={(value as any)}
                                    currency={restaurantinfo?.defaultLocation?.currencysymbol}
                                />
                            );
                        })}
                    <div className="additional-order-info">
                        <textarea
                            className="form-control"
                            value={note}
                            onBlur={onBlurComment}
                            onChange={handleChangeNote}
                            placeholder="Enter any additional information about your order."
                            name="comment"
                        ></textarea>
                    </div>
                    <div className="sticky-cart">
                        <div className="d-flex align-items-center">
                            <div className="total-price">
                                {/* <h3 className="font18 mb-0">${tableorder?.carttotal?.subTotal?.toFixed(2)}</h3> */}
                                {/* <h3 className="font18 mb-0">
                                    ${Number(tableorder?.carttotal?.subTotal || 0).toFixed(2)}
                                </h3> */}

                                <p className="font10 mb-0">Extra charges may apply</p>
                            </div>
                            <div className="add-to-kitchen-btn">
                                <a onClick={handleClickAddToKitchenCopy} className="font10 cursor-pointer">
                                    Send to Kitchen Order
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetailsComponent;
