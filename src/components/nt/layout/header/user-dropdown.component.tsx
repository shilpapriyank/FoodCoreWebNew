'use client';

import React, { useState } from "react";
import Link from "next/link";
import { GetThemeDetails } from "../../../common/utility";
import { PAGES } from "../../common/pages";
import { useRouter, usePathname } from "next/navigation";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

const UserDropdown = ({
  handleOpenLoginModal,
  handleLogOutclick,
  isWelcome = true,
}: any) => {
  const { userinfo, restaurantinfo } = useReduxData();
  const router = useRouter();
  const pathname = usePathname();
  // const selectedTheme = GetThemeDetails(restaurantinfo.themetype);
  const selectedTheme = GetThemeDetails((restaurantinfo as GetAllRestaurantInfo )?.themetype); // Assuming this is intentional and safe
  const [isOpenDropdown, setisOpenDropdown] = useState(false);

  // Safely get location and restaurantURL
  const location = restaurantinfo?.defaultLocation?.locationURL;
  const restaurantURL = restaurantinfo?.restaurantURL;

  const locationFullLink =
    selectedTheme && restaurantURL && location
      ? `/${selectedTheme.url}/${restaurantURL}/${location}/`
      : "";

  const locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;

  const handleClikLogin = () => {
    setisOpenDropdown(false);
    handleOpenLoginModal(true);
  };

  const handleClickLogout = () => {
    setisOpenDropdown(false);
    handleLogOutclick();
  };

  const getDropdownClass = (route: string) =>
    pathname?.includes(route) ? "active dropdown-item" : "dropdown-item";

  return (
    <>
      {userinfo === null &&
        <button
          className="btn btn-sm btn-default login-btn d-none d-md-block"
          onClick={handleClikLogin}
        >
          Login
        </button>}

      {userinfo && (
        <li className="dropdown profile-dropdown">
          <button
            onClick={() => setisOpenDropdown(!isOpenDropdown)}
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-user-circle" /> {isWelcome ? "Welcome" : ""} {userinfo?.firstname}
          </button>

          <ul className={`dropdown-menu ${isOpenDropdown ? "show" : ""}`}>
            <Link
              href={`${locationFullLink}myaccount`}
              className={getDropdownClass("/myaccount")}
            >
              <i className="fa fa-user me-3"></i>My Profile
            </Link>

            <Link
              href={`${locationFullLink}favourite`}
              className={getDropdownClass("/favourite")}
            >
              <i className="fa fa-heart me-3"></i>Favourite
            </Link>

            <Link
              href={`${locationFullLink}${PAGES.MYORDERS}`}
              className={getDropdownClass("/myorders")}
            >
              <i className="fa fa-cutlery me-3"></i>My Orders
            </Link>

            <Link
              href={`${locationFullLink}${PAGES.LOCATIONS}`}
              className={getDropdownClass("/locations")}
            >
              <i className="fa fa-map-marker me-3 fs-5"></i>Locations
            </Link>

            <Link
              href={`${locationFullLink}${PAGES.ABOUTUS}`}
              className={getDropdownClass("/aboutus")}
            >
              <i className="fa fa-info me-3 fs-5"></i>&nbsp;About Us
            </Link>

            <Link
              href={`${locationFullLink}${PAGES.PRIVACY}`}
              className={getDropdownClass("/privacy")}
            >
              <i className="fa fa-shield me-3"></i>Privacy
            </Link>

            <Link
              href={`${locationFullLink}${PAGES.TERMS}`}
              className={getDropdownClass("/terms")}
            >
              <i className="fa fa-pencil-square-o me-3"></i>Terms
            </Link>

            <li>
              <a className="dropdown-item" onClick={handleClickLogout}>
                <i className="fa fa-sign-out me-3"></i>Logout
              </a>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default UserDropdown;


{/* <Link legacyBehavior href={locationHrefLink + "myaccount"} as={`${locationFullLink}myaccount`}>
              <a className={getDropdownClass("/myaccount")}>
                <i className="fa fa-user me-3"></i>My Profile
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + "favourite"} as={`${locationFullLink}favourite`}>
              <a className={getDropdownClass("/favourite")}>
                <i className="fa fa-heart me-3"></i>Favourite
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + PAGES.MYORDERS} as={`${locationFullLink}${PAGES.MYORDERS}`}>
              <a className={getDropdownClass("/myorders")}>
                <i className="fa fa-cutlery me-3"></i>My Orders
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + PAGES.LOCATIONS} as={`${locationFullLink}${PAGES.LOCATIONS}`}>
              <a className={getDropdownClass("/locations")}>
                <i className="fa fa-map-marker me-3 fs-5"></i>Locations
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + PAGES.ABOUTUS} as={`${locationFullLink}${PAGES.ABOUTUS}`}>
              <a className={getDropdownClass("/aboutus")}>
                <i className="fa fa-info me-3 fs-5"></i>&nbsp;About Us
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + PAGES.PRIVACY} as={`${locationFullLink}${PAGES.PRIVACY}`}>
              <a className={getDropdownClass("/privacy")}>
                <i className="fa fa-shield me-3"></i>Privacy
              </a>
            </Link>

            <Link legacyBehavior href={locationHrefLink + PAGES.TERMS} as={`${locationFullLink}${PAGES.TERMS}`}>
              <a className={getDropdownClass("/terms")}>
                <i className="fa fa-pencil-square-o me-3"></i>Terms
              </a>
            </Link>

            <li>
              <a className="dropdown-item" onClick={handleClickLogout}>
                <i className="fa fa-sign-out me-3"></i>Logout
              </a>
            </li> */}