"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { MyOrderServices } from "../../../../../../redux/myorders/myorders.services";
import { useQuery } from "@tanstack/react-query";
import {
  getMenuItemDetailes,
  selectedMenuItem,
} from "../../../../../../redux/menu-item/menu-item.slice";
import Head from "next/head";
import { MYORDERPAGE_MESSAGE } from "@/components/nt/helpers/static-message/myorder-message";
import Layout from "@/components/nt/layout/layout.component";
import AuthGuardComponent from "@/components/nt/common/authgaurd.component";
import { MyOrderSkeleton } from "@/components/nt/skeleton/myorder-skeleton";
import { MyOrdersComponent } from "@/components/nt/myorders/myorders.component";
import NoOrderFoundComponent from "@/components/nt/myorders/noorder-found.component";
import ScrollToTop from "@/components/common/scroll-to-top";

const MyOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { userinfo, restaurantinfo } = useReduxData();
  let customerId = userinfo ? userinfo.customerId : 0;
  const [showAll, setshowAll] = useState<boolean>(false);
  let [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [orderHistoryRecord, setOrderHistoryRecord] = useState([]);

  const { isError, isLoading, data, isSuccess, refetch, isFetching } = useQuery(
    {
      queryKey: ["getOrders", restaurantinfo?.restaurantId, customerId],
      queryFn: () =>
        MyOrderServices.getOrderHistory(
          customerId,
          restaurantinfo?.defaultlocationId as number,
          restaurantinfo?.restaurantId as number,
          pageIndex,
          pageSize
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      data?.orderHistory &&
      data?.orderHistory.length > 0 &&
      pageIndex === 0
    ) {
      var oldArray = [];
      orderHistoryRecord.length > 0 && oldArray.push(...orderHistoryRecord);
      oldArray.push(...data?.orderHistory);

      setOrderHistoryRecord(oldArray as any);
      setTotalCount(data?.totalCount);
    }
    if (pageIndex > 0 && data?.orderHistory !== undefined) {
      var oldArray = [];
      orderHistoryRecord.length > 0 && oldArray.push(...orderHistoryRecord);

      oldArray.push(...data?.orderHistory);

      setOrderHistoryRecord(oldArray as any);
    }
  }, [data, isSuccess]);

  const displayFullList = () => {
    let maxlimitNumber = totalCount / pageSize;
    if (pageIndex < maxlimitNumber) {
      pageIndex = pageIndex + 1;
      setPageIndex(pageIndex);
      refetch();
    } else {
      return;
    }
  };

  const selectedItemClick = (item: any) => {
    if (item != undefined) {
      dispatch(selectedMenuItem(item));
      dispatch(
        getMenuItemDetailes({
          restaurantId: restaurantinfo?.restaurantId as number,
          locationId: restaurantinfo?.defaultlocationId as number,
          customerId: 0,
          menuitemId: item.menuitemid,
          cartsessionId: "",
          cartId: 0,
        })
      );
    }
  };
  return (
    <>
      <Head>
        <title>
          My Orders || {restaurantinfo?.restaurantname}:{" "}
          {MYORDERPAGE_MESSAGE.ORDERING_ONLINE}
        </title>
        <meta name="description" content="Online description" />
      </Head>

      <Layout>
        <AuthGuardComponent>
          <section className="categories-info">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <h4 className="small-heading">My Orders</h4>
                    </div>
                  </div>
                  <div className="order-details p-0 border-0">
                    {isLoading || isFetching ? (
                      <>
                        <MyOrderSkeleton />
                      </>
                    ) : (
                      <>
                        {isSuccess && orderHistoryRecord.length > 0 ? (
                          <>
                            <MyOrdersComponent
                              orderHistoryFull={orderHistoryRecord}
                              showAll={showAll}
                              selectedItemClick={selectedItemClick}
                            />

                            {pageIndex == totalCount / pageSize ? (
                              <div className="h-100 d-flex align-items-center justify-content-center">
                                {" "}
                                <a className="btn-default w-auto button-disable no-drop">
                                  Show More
                                </a>
                              </div>
                            ) : (
                              <div className="h-100 d-flex align-items-center justify-content-center">
                                {" "}
                                <a
                                  onClick={displayFullList}
                                  className="btn-default w-auto mb-2"
                                >
                                  {" "}
                                  {data?.totalCount > pageSize && "Show More "}
                                </a>{" "}
                              </div>
                            )}
                          </>
                        ) : (
                          <NoOrderFoundComponent
                            themeType={restaurantinfo?.themetype}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ScrollToTop />
        </AuthGuardComponent>
      </Layout>
    </>
  );
};

export default MyOrdersPage;
