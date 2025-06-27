import React from "react";
import Link from "next/link";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

interface RegisterHeaderLogoProps {
  restaurantinfo?: GetAllRestaurantInfo;
}

const RegisterHeaderLogoComponent: React.FC<RegisterHeaderLogoProps> = ({
  restaurantinfo,
}) => {
  const { restaurantinfodetail } = useReduxData();
  const restaurantInfoDetail = restaurantinfo ?? restaurantinfodetail;
  if (!restaurantInfoDetail) {
    return null;
  }
  const { logo, restaurantURL } = restaurantInfoDetail;

  return (
    <>
      <div className="col-lg-8 hidden-xs text-center col-sm-4 col-xs-6">
        <Link href="/[dynamic]/" as={`/${restaurantURL}/`}>
          <a>
            {logo ? (
              // <Image src={logo}
              //     alt="Picture of the author"
              //     width={180}
              //     height={100} ></Image>
              <img src={logo} alt="" width={180} height={100} />
            ) : (
              ""
            )}
            {/* <img src={logo} alt="" height="100" width="180" /> */}
            {/* <img src="/images/logo-blue.png" alt="" /> */}
          </a>
        </Link>
      </div>
    </>
  );
};

export const MemoizedRegisterHeaderLogoComponent = React.memo(
  RegisterHeaderLogoComponent
);
