import { onValue, ref, update } from 'firebase/database';
import db from '../firebase/db';
import { generateTableName } from '../../common/utility';
import { useDispatch } from 'react-redux';
import { getCartData, getCartItemCount, getCartTotal } from '../../../../redux/tableorder/tableorder.slice'; // using RTK slice
import handleNotify from '../../default/helpers/toaster/toaster-notify';
import { ToasterPositions } from '../../default/helpers/toaster/toaster-positions';
import { ToasterTypes } from '../../default/helpers/toaster/toaster-types';
import { AppDispatch } from '../../../../redux/store';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';

type CartItem = {
    qty: string;
    total: string;
    [key: string]: any;
};

const useManageCartData = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { restaurantinfo, tableorder } = useReduxData();
    if (!restaurantinfo) return;
    const collectionName = generateTableName(
        restaurantinfo?.restaurantId,
        restaurantinfo?.defaultlocationId,
        process.env.NEXT_PUBLIC_ENV
    );
    const carttotal = tableorder.carttotal;

    const getCartItems = (): void => {
        const starCountRef = ref(db, `${collectionName}/${tableorder?.tabledetail?.tableId}/Menu`);
        onValue(starCountRef, (snapshot) => {
            const data: Record<string, CartItem> | null = snapshot.val();
            dispatch(getCartData(data ?? {}));

            let subtotal = 0;
            if (data) {
                subtotal = Object.values(data).reduce((acc, { total }) => acc + parseFloat(total ?? '0'), 0);
            }

            const cartTotal = {
                ...carttotal,
                subTotal: parseFloat(subtotal.toFixed(2)),
            };

            dispatch(getCartTotal(cartTotal as any));
            updateCount(data);
        });
    };

    const getCartCount = (cuurentcount = 0): void => {
        const starCountRef = ref(db, `${collectionName}/${tableorder?.tabledetail?.tableId}/Menu`);
        let count = cuurentcount
        onValue(starCountRef, (snapshot) => {
            const data: Record<string, CartItem> | null = snapshot.val();
            updateCount(data);
        });
    };

    const updateCount = (data: Record<string, CartItem> | null): void => {
        const count = data ? Object.values(data).length : 0;
        dispatch(getCartItemCount(count));
    };

    /**
       * increment item qty
       * @param {number} qty
       * @param {number} id
       * @param {number} total
       */
    const incrementQty = (qty: number, id: string, total: number): void => {
        const plusQty = qty + 1;
        const itemPrice = parseFloat(total.toString()) / qty;
        const itemSubTotal = (itemPrice * plusQty).toFixed(2);

        const updates: Record<string, any> = {
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/Menu/${id}/qty`]: plusQty,
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/Menu/${id}/total`]: itemSubTotal,
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/isToSetCurrentDeviceTag`]: false,
        };

        update(ref(db), updates).then(() => {
            handleNotify('Update cart item successfully.', ToasterPositions.TopRight, ToasterTypes.Success);
        });
    };

    /**
   * decrement item qty
   * @param {number} qty
   * @param {number} id
   * @param {number} total
   */
    const decrementQty = (qty: number, id: string, total: number): void => {
        const minusQty = qty - 1;
        if (minusQty !== 0) {
            const itemPrice = parseFloat(total.toString()) / qty;
            const itemSubTotal = (itemPrice * minusQty).toFixed(2);

            const updates: Record<string, any> = {
                [`${collectionName}/${tableorder?.tabledetail?.tableId}/Menu/${id}/qty`]: minusQty,
                [`${collectionName}/${tableorder?.tabledetail?.tableId}/Menu/${id}/total`]: itemSubTotal,
                [`${collectionName}/${tableorder?.tabledetail?.tableId}/isToSetCurrentDeviceTag`]: false,
            };

            update(ref(db), updates).then(() => {
                handleNotify('Update cart item successfully.', ToasterPositions.TopRight, ToasterTypes.Success);
            });
        }
    };

    /**
    * remove item from the cart
    * @param {string}
    */
    const removeCartItem = (id: string): void => {
        const updates: Record<string, any> = {
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/Menu/${id}`]: null,
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/isToSetCurrentDeviceTag`]: false,
        };

        update(ref(db), updates).then(() => {
            handleNotify('Item removed successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
        });
    };

    /**
    * update single property value in the firebase
    * @param {String} path
    * @param {any} value
    */
    const updateProperty = (path: string, value: any): void => {
        const updates: Record<string, any> = {
            [`${collectionName}/${tableorder?.tabledetail?.tableId}/${path}`]: value,
        };

        update(ref(db), updates);
    };

    /**
    * update multiple property value in the firebase
    */
    const updateManyProperty = (obj: Record<string, any>): void => {
        const updates: Record<string, any> = {};

        for (const [key, value] of Object.entries(obj)) {
            updates[`${collectionName}/${tableorder?.tabledetail?.tableId}/${key}`] = value;
        }

        update(ref(db), updates);
    };

    return {
        getCartItems,
        incrementQty,
        decrementQty,
        removeCartItem,
        getCartCount,
        updateProperty,
        updateManyProperty,
    };
};

export default useManageCartData;
