// import { useRouter } from 'next/router';
// import React, { useEffect } from 'react';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import stylesloader from "../../styles/loader.module.css";
// import { RootState } from '../../../redux/store';

// const DynamicPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const {
//         query: { dynamic, location, theme },
//     } = router;

//     const restaurantinfo = useSelector(
//         (state: RootState) => state.restaurant?.restaurantdetail,
//         shallowEqual
//     );

//     useEffect(() => {
//         let routepath = '';
//         const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);

//         if (selectedTheme?.name === ThemeObj.dominos) {
//             routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
//         } else if (selectedTheme?.name === ThemeObj.default) {
//             routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}/main`;
//         } else if (selectedTheme?.name === ThemeObj.newtheme) {
//             routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`;
//         }

//         router.push(routepath);
//         // dispatch(ChangeUrl(true))
//         return;
//     }, []);

//     return (
//         <div style={{ display: "flex", justifyContent: "center", verticalAlign: "middle", marginTop: "15%" }}>
//             <div className={stylesloader.customloader}></div>
//         </div>
//     );
// };

// export default DynamicPage;
