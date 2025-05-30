import React, { useState } from "react";
import Link from "next/link";
import { GetThemeDetails } from "../../../common/utility";
import { PAGES } from "../../common/pages";
import { useRouter } from "next/router";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const UserDropdown = ({
  handleOpenLoginModal,
  handleLogOutclick,
  isWelcome = true,
}: any) => {
  const { userinfo, restaurantinfo } = useReduxData();
  const router = useRouter();
  const selectedTheme = GetThemeDetails(restaurantinfo.themetype);
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  let location = restaurantinfo?.defaultLocation?.locationURL;
  let locationFullLink =
    "/" +
    selectedTheme?.url +
    "/" +
    restaurantinfo.restaurantURL +
    "/" +
    location +
    "/";
  let locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;
  const handleClikLogin = () => {
    setisOpenDropdown(false);
    handleOpenLoginModal(true);
  };
  const handleClickLogout = () => {
    setisOpenDropdown(false);
    handleLogOutclick();
  };
  return (
    <>
      {userinfo === null && (
        <button
          className="btn btn-sm btn-default login-btn d-none d-md-block"
          onClick={handleClikLogin}
        >
          {" "}
          log in from hereLogin
        </button>
      )}
      {userinfo && (
        <li className="dropdown profile-dropdown">
          <button
            onClick={() => setisOpenDropdown(!isOpenDropdown)}
            className="btn btn-secondary dropdown-toggle"
            role="button"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-user-circle" /> {isWelcome ? "Welcome" : ""}{" "}
            {userinfo?.firstname}
          </button>
          <ul className={`dropdown-menu ${isOpenDropdown ? "show" : ""}`}>
            <Link
              legacyBehavior
              href={locationHrefLink + "myaccount"}
              as={`${locationFullLink}myaccount`}
            >
              <a
                className={
                  router.pathname.includes("/myaccount")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                <i className="fa fa-user me-3"></i>My Profile
              </a>
            </Link>
            <Link
              legacyBehavior
              href={locationHrefLink + "favourite"}
              as={`${locationFullLink}favourite`}
            >
              <a
                className={
                  router.pathname.includes("/favourite")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                <i className="fa fa-heart me-3"></i>Favourite
              </a>
            </Link>
            <Link
              className={router.pathname.includes("/myorders") ? "active" : ""}
              legacyBehavior
              href={locationHrefLink + PAGES.MYORDERS}
              as={`${locationFullLink}${PAGES.MYORDERS}`}
            >
              <a
                className={
                  router.pathname.includes("/myorders")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                {" "}
                <i className="fa fa-cutlery me-3"></i>My Orders
              </a>
            </Link>
            <Link
              className={router.pathname.includes("/locations") ? "active" : ""}
              legacyBehavior
              href={locationHrefLink + PAGES.LOCATIONS}
              as={`${locationFullLink}${PAGES.LOCATIONS}`}
            >
              <a
                className={
                  router.pathname.includes(`/${PAGES.LOCATIONS}`)
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                {" "}
                <i className="fa fa-map-marker me-3 fs-5"></i>Locations
              </a>
            </Link>
            <Link
              legacyBehavior
              href={locationHrefLink + PAGES.ABOUTUS}
              as={`${locationFullLink}${PAGES.ABOUTUS}`}
            >
              <a
                className={
                  router.pathname.includes("/aboutus")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                {" "}
                <i className="fa fa-info me-3 fs-5"></i>&nbsp;About Us
              </a>
            </Link>
            <Link
              legacyBehavior
              href={locationHrefLink + PAGES.PRIVACY}
              as={`${locationFullLink}${PAGES.PRIVACY}`}
            >
              <a
                className={
                  router.pathname.includes("/privacy")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                {" "}
                <i className="fa fa-shield me-3 "></i>Privacy
              </a>
            </Link>
            <Link
              legacyBehavior
              href={locationHrefLink + PAGES.TERMS}
              as={`${locationFullLink}${PAGES.TERMS}`}
            >
              <a
                className={
                  router.pathname.includes("/terms")
                    ? "active dropdown-item"
                    : "dropdown-item"
                }
              >
                {" "}
                <i className="fa fa-pencil-square-o me-3"></i>Terms
              </a>
            </Link>
            <li>
              <a className="dropdown-item" onClick={handleClickLogout}>
                {" "}
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
