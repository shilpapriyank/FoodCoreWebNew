'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Logo from './logo.component';
import SelectedAddressHeader from './selected-address-header.component';
import UserDropdown from './user-dropdown.component';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { GetThemeDetails } from '@/components/common/utility';
import { PAGES } from '../../common/pages';
import { AppDispatch } from '../../../../../redux/store';
import { ToasterPositions } from '@/components/default/helpers/toaster/toaster-positions';
import { ToasterTypes } from '@/components/default/helpers/toaster/toaster-types';
import handleNotify from '@/components/default/helpers/toaster/toaster-notify';
import { clearRedux } from '../../../../../redux/clearredux/clearredux.slice';
import { setRewardPoint } from '../../../../../redux/cart/cart.slice';
import useFutureOrder from '@/components/customhooks/usefuture-order-hook';

interface HeaderProps {
    handleChangeAddress?: () => void;
    page?: string;
}

const Header: React.FC<HeaderProps> = ({ handleChangeAddress, page }) => {
    const { restaurantinfo, selecteddelivery, order, userinfo } = useReduxData();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const pathname = usePathname();
    const params = useParams();

    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [isOpenOrderTypeModal, setisOpenOrderTypeModal] = useState(false);

    const logoUrl = restaurantinfo?.logo ?? 'https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/Resources/RestaurantLogo/14.png';
    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    const isHomePage = page === 'location';

    const themeUrl = selectedTheme?.url ?? 'nt';
    const restaurantUrl = restaurantinfo?.restaurantURL ?? 'fc';
    const locationSlug = restaurantinfo?.defaultLocation?.locationURL ?? 'toronto';
    const b2b = restaurantinfo?.defaultLocation?.b2btype ?? false;
    const isSchoolProgramEnabled = restaurantinfo?.defaultLocation?.schoolprogramenabled ?? false;
    const orderTypeName = selecteddelivery?.pickupordelivery;
    const { recievingDate, enabletimeslot, isFutureOrder, futureDay } = useFutureOrder()


    const locationFullLink = `/${themeUrl}/${restaurantUrl}/${locationSlug}`;

    const handleOpenLoginModal = (value: boolean) => {
        setOpenLoginModal(value);
    };

    const handleToggleOrderTypeModal = (value: boolean) => {
        setisOpenOrderTypeModal(value);
    };

    const handleToggleTimingModal = (value: boolean) => {
        // You can implement this modal logic accordingly
    };

    const handleLogOutclick = useCallback(() => {
        if (userinfo) {
            handleNotify('Logout successfully!', ToasterPositions.TopRight, ToasterTypes.Success);

            const routepath = `/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}/${restaurantinfo?.defaultLocation?.locationURL}`;
            router.push(routepath);
        } else {
            handleNotify('Please login first before logout!', ToasterPositions.TopRight, ToasterTypes.Info);
        }
    }, [userinfo, dispatch, router, selectedTheme?.url, restaurantinfo]);

    useEffect(() => {
        if (b2b && !userinfo && !openLoginModal) {
            setOpenLoginModal(true);
        }
    }, [b2b, userinfo, openLoginModal]);

    return (
        <section className="header">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-2 text-center col-md-3 col-10">
                        {isHomePage ? (
                            <>
                                <a className={`logo d-md-block ${userinfo === null ? 'd-none' : ''}`}>
                                    <span className="head-arrow">
                                        <i className="fa fa-angle-left" />
                                    </span>
                                    <Link href={locationFullLink}>
                                        <img src={logoUrl} alt="Logo" />
                                    </Link>
                                </a>
                                {userinfo === null && (
                                    <a className="logo d-block d-md-none login-btn" onClick={() => handleOpenLoginModal(true)}>
                                        <span className="head-arrow">
                                            <i className="fa fa-user color-green" />
                                        </span>
                                        <img src={logoUrl} alt="Logo" />
                                    </a>
                                )}
                            </>
                        ) : (
                            <Logo logoUrl={logoUrl} path={locationFullLink} />
                        )}
                    </div>

                    <div className="col-lg-8 col-md-8 col-12">
                        {!(pathname.includes(PAGES.PAYMENT) || pathname.includes(PAGES.CREATE_NEW_PASS)) && (
                            <form>
                                <div className="align-form">
                                    <div className='d-flex justify-content-center mb-2 mb-md-0'>
                                        {restaurantinfo?.ioslink && (
                                            <a className="cursor_pointer app-icon px-1" href={restaurantinfo.ioslink} target="_blank" rel="noreferrer">
                                                <img src="/nt/img/app_store.png" />
                                            </a>
                                        )}
                                        {restaurantinfo?.androidlink && (
                                            <a className="cursor_pointer app-icon px-1" href={restaurantinfo.androidlink} target="_blank" rel="noreferrer">
                                                <img src="/nt/img/android.png" />
                                            </a>
                                        )}
                                    </div>

                                    <SelectedAddressHeader b2b={b2b} handleToggleOrderTypeModal={handleToggleOrderTypeModal} />

                                    {!b2b && !isSchoolProgramEnabled && (
                                        <>
                                            {orderTypeName && <label className='d-none d-md-block'>{orderTypeName} time</label>}
                                            <h6 className='align-center mt-2 color-dynamic cursor-pointer pointer-cursor'>
                                                {orderTypeName && <span className='d-md-none text-dark me-1'>{orderTypeName} time</span>}
                                                {/* {isFutureOrder && <span className='btn-default '>{futureDay?.futureDay}</span>}&nbsp; */}
                                                <span className="text btn-default  " onClick={() => handleToggleTimingModal(true)}>{order.isasap ? 'Asap' : 'Later'}</span>&nbsp;
                                                {order.checktime && <span className='btn-default' onClick={() => handleToggleTimingModal(true)}>{order.checktime}</span>}
                                                {userinfo === null && (
                                                    <span className="btn btn-sm btn-default d-none d-md-block login-btn d-md-none ms-1" onClick={() => handleOpenLoginModal(true)}>Login</span>
                                                )}
                                            </h6>
                                        </>
                                    )}
                                    {isSchoolProgramEnabled && userinfo === null && (
                                        <h6 className='align-center mt-2 color-dynamic cursor-pointer'>
                                            <span className="btn btn-sm btn-default d-none d-md-block login-btn d-md-none ms-1" onClick={() => handleOpenLoginModal(true)}>Login</span>
                                        </h6>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="col-lg-2 col-md-12 text-md-end col-12 d-none d-md-block">
                        <UserDropdown handleLogOutclick={handleLogOutclick} handleOpenLoginModal={handleOpenLoginModal} />
                    </div>

                    <div className="d-block d-md-none user-drop">
                        <UserDropdown isWelcome={false} handleLogOutclick={handleLogOutclick} handleOpenLoginModal={handleOpenLoginModal} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;


// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link';
// import Logo from './logo.component';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { GetThemeDetails } from '@/components/common/utility';
// import { usePathname, useParams, useRouter } from 'next/navigation';

// interface HeaderProps {
//     handleChangeAddress?: () => void;
//     page?: string;
// }

// const Header: React.FC<HeaderProps> = ({ handleChangeAddress, page }) => {
//     const { restaurantinfo, selecteddelivery, order, userinfo } = useReduxData();
//     const [openLoginModal, setOpenLoginModal] = useState(false);

//     const pathname = usePathname();
//     const params = useParams();
//     const router = useRouter();

//     const logoUrl = restaurantinfo?.logo ?? 'https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/Resources/RestaurantLogo/14.png';
//     const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
//     const isHomePage = page === 'location';

//     const themeUrl = selectedTheme?.url ?? 'nt';
//     const restaurantUrl = restaurantinfo?.restaurantURL ?? 'fc';
//     const locationSlug = restaurantinfo?.defaultLocation?.locationURL ?? 'toronto';

//     const locationFullLink = `/${themeUrl}/${restaurantUrl}/${locationSlug}`;

//     const handleOpenLoginModal = (value: boolean) => {
//         setOpenLoginModal(value);
//     };

//     // If needed: open login modal automatically on B2B type
//     useEffect(() => {
//         const b2b = restaurantinfo?.defaultLocation?.b2btype;
//         if (b2b && !userinfo && !openLoginModal) {
//             setOpenLoginModal(true);
//         }
//     }, [restaurantinfo?.defaultLocation?.b2btype, userinfo]);

//     return (
//         <section className="header">
//             <div className="container-fluid">
//                 <div className="row align-items-center">
//                     <div className="col-lg-2 text-center col-md-3 col-10">
//                         {isHomePage ? (
//                             <>
//                                 <a className={`logo d-md-block ${userinfo === null ? 'd-none' : ''}`}>
//                                     <span className="head-arrow">
//                                         <i className="fa fa-angle-left" />
//                                     </span>
//                                     <Link href={locationFullLink}>
//                                         <img src={logoUrl} alt="Logo" />
//                                     </Link>
//                                 </a>

//                                 {userinfo === null && (
//                                     <a
//                                         className="logo d-block d-md-none login-btn"
//                                         onClick={() => handleOpenLoginModal(true)}
//                                     >
//                                         <span className="head-arrow">
//                                             <i className="fa fa-user color-green" />
//                                         </span>
//                                         <img src={logoUrl} alt="Logo" />
//                                     </a>
//                                 )}
//                             </>
//                         ) : (
//                             <Logo logoUrl={logoUrl} path={locationFullLink} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Header;






{/* <div>
                                <p>This is Header component</p>
                                {page && <p>Current page: {page}</p>}
                                {handleChangeAddress && (
                                    <button onClick={handleChangeAddress}>Change Address</button>
                                )}
                            </div> */}