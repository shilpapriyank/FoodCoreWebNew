import React from "react";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

export const OrderPreparationDetail: React.FC = () => {
    const { restaurantinfo, selecteddelivery, order, userinfo } = useReduxData();

    const b2b: boolean | undefined = restaurantinfo?.defaultLocation?.b2btype;

    return (
        (order?.checktime && order.checktime !== "" && !b2b) && (
            <div className="card orderbox px-1 mb-2 py-2 pb-0">
                <h5>ORDER READY FOR</h5>
                <div className={`${restaurantinfo.defaultLocation?.enablefutureordering === false ? 'order-time fs-4' : 'order-time-slot fs-4'}`}>
                    {order.checktime} <br />
                    <span> <br /></span>
                </div>
            </div>
        )
    );
};
