// import { useCallback, useMemo } from 'react';
// import { CUSTOMER_TYPE, ORDERTYPE } from '../common/utility';
// import { Category } from '@/types/customhook-types/utility.types';
// import { useReduxData } from './useredux-data-hooks';

// const useUtility = () => {
//     const { userinfo, restaurantinfo } = useReduxData();

//     // ✅ Show price only if user is not subscribed
//     const isDisplayPrice: boolean = !userinfo || userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;

//     // ✅ Show reward/tip only if user is not subscribed
//     const isRewardTip: boolean = userinfo?.customertype !== CUSTOMER_TYPE.SUBSCRIBE;

//     // ✅ Check if business name is required for this restaurant
//     const checkIsBusinessNameRequiredForRestaurant = useCallback((restaurantId?: number): boolean => {
//         const ids = process.env.NEXT_PUBLIC_BUSINESSNAME_REQUIRED_RESTAURANT_IDS?.split(',') ?? [];
//         return restaurantId !== undefined && ids.includes(restaurantId.toString());
//     }, []);

//     // ✅ Memoized check based on current restaurant
//     const isBusinessNameRequired = useMemo<boolean>(() => {
//         return checkIsBusinessNameRequiredForRestaurant(restaurantinfo?.restaurantId);
//     }, [restaurantinfo?.restaurantId, checkIsBusinessNameRequiredForRestaurant]);

//     // ✅ Filter categories based on pickup/delivery type
//     const filterCategory = (allCat: Category[], pickupordelivery?: string): Category[] => {
//         if (!pickupordelivery || allCat?.length === 0) return allCat;

//         if (pickupordelivery === ORDERTYPE.Pickup) {
//             return allCat.filter(cat => cat.istakeoutavailable);
//         } else if (pickupordelivery === ORDERTYPE.Delivery) {
//             return allCat.filter(cat => cat.isdeliveryavailable);
//         }

//         return allCat;
//     };

//     // ✅ Address required flag
//     const isAddressRequired: boolean = !!restaurantinfo?.IsAddressMandatoryForRegister;

//     return {
//         isDisplayPrice,
//         isRewardTip,
//         isAddressRequired,
//         isBusinessNameRequired,
//         filterCategory
//     };
// };

// export default useUtility;
