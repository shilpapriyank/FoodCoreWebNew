import React from "react";
import { CUSTOMER_TYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const OrderItem = ({
  item,
  customerType,
  index,
  handleOrderClick,
  currency,
  locatioId,
  handleLocationDetails,
}: any) => {
  const { restaurantinfo } = useReduxData();
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;

  return (
    <div className="cols">
      <div className="card itembox">
        <div className="text">
          <h3>
            {item.itemName}
            {customerType !== CUSTOMER_TYPE.SUBSCRIBE && (
              <span>
                {" "}
                {currency}
                {item.netprice && item.netprice.toFixed(2)}
              </span>
            )}
            {/* <span>$11.49</span> */}
          </h3>
          {item.subOptionList !== "" && (
            <p dangerouslySetInnerHTML={{ __html: item.subOptionListText }} />
          )}
          <div className="d-flex align-items-center">
            <div className="quantity normal qty-container roundstyle">
              {/* <button className="qty-btn-minus btn-light quantity__minus" type="button">
                                <i className="fa fa-minus" />
                            </button> */}

              {/* <button className="qty-btn-plus btn-light quantity__plus" type="button">
                                <i className="fa fa-plus" />
                            </button> */}
              <h6>Qty:{item?.quantity}</h6>
            </div>
            {!isSchoolProgramEnabled && (
              <>
                {restaurantinfo?.defaultlocationId !== locatioId ? (
                  <a
                    className={`btn-default  reorder-${index}  ms-3 small`}
                    // data-bs-target="#order-confirm-change"
                    // data-bs-toggle="modal"
                    onClick={() =>
                      handleLocationDetails(
                        locatioId,
                        "itemOrder",
                        item.orderdetailId,
                        `reorder-${index}`
                      )
                    }
                    //  onClick={() => { handleOrderClick(item.orderdetailId) }}
                  >
                    Re-Order
                  </a>
                ) : (
                  <a
                    className={`btn-default  reorder-${index}  ms-3 small`}
                    onClick={() => {
                      handleOrderClick(item.orderdetailId, `reorder-${index}`);
                    }}
                  >
                    Re-Order
                  </a>
                )}
              </>
            )}
          </div>
        </div>
        <div className="img">
          {/* <img src="assets/img/item-2.jpeg" alt /> */}
          <a className="fa wishlist fa-heart-o" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
