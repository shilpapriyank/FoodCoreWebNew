import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { selecteddeliveryaddress } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { setDeliveryRequestId } from "../../../../redux/order/order.slice";
import { DeliveryAddressTypes } from "../../../../redux/delivery-address/delivery-address.type";
import {
  addAddress,
  AddTempDeliveryAddress,
  registerAddress,
  updateAddressId,
} from "../../../../redux/delivery-address/delivery-address.slice";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { DeliveryAddressServices } from "../../../../redux/delivery-address/delivery-address.services";
import { GoogleAutoComplete } from "@/components/dominos/Address/autocomplete.component";
import { ObjTypeForVerifyDeliveryAddressType } from "../../../../redux/delivery-address/delivery-address.types";

interface AddAddressProps {
  isOpenModal: boolean;
  handleToggleAddAddressModal: (value: boolean) => void;
  isRegister?: boolean;
  handleToggleTimingModal?: (value: boolean) => void;
}

interface AddressField {
  businessname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
  apartment: string;
  latitude: number;
  longitude: number;
}

const AddAddress: React.FC<AddAddressProps> = ({
  isOpenModal,
  handleToggleAddAddressModal,
  isRegister = false,
  handleToggleTimingModal,
}) => {
  const { userinfo, restaurantinfo, deliveryaddress } = useReduxData();
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>("");
  const [isResetQuery, setIsResetQuery] = useState<boolean>(false);

  const [addressField, setAddressField] = useState<AddressField>({
    businessname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    apartment: "",
    latitude: 0,
    longitude: 0,
  });

  const customerId = userinfo?.customerId || 0;
  const restaurantId = restaurantinfo?.restaurantId;
  const locationId = restaurantinfo?.defaultLocation?.locationId;
  const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;

  const sendToParent = (index: any) => {
    setAddressField((prev) => ({
      ...prev,
      address1: index.address1,
      city: index.city,
      state: index.state,
      postalcode: index.zip,
      country: index.country,
      latitude: index.lat,
      longitude: index.lng,
    }));
  };

  useEffect(() => {
    setQuery("");
    setAddressField({
      businessname: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalcode: "",
      country: "",
      apartment: "",
      latitude: 0,
      longitude: 0,
    });
  }, []);

  const handleClickSaveAddress = () => {
    dispatch(setDeliveryRequestId(""));

    const {
      address1,
      address2,
      city,
      state,
      postalcode,
      country,
      apartment,
      latitude,
      longitude,
      businessname,
    } = addressField;

    if (address1 && city && state && postalcode) {
      // const obj = {
      //   customerId,
      //   othercustomerId: 0,
      //   deliveryaddressId: 0,
      //   address1,
      //   address2,
      //   landmark: apartment,
      //   city,
      //   zipcode: postalcode,
      //   contactno: "",
      //   contactname: "",
      //   latitude,
      //   longitude,
      //   state,
      //   country,
      //   addresstype: 0,
      //   businessname: businessname || "",
      // };

      const obj: ObjTypeForVerifyDeliveryAddressType = {
        customerId,
        othercustomerId: 0,
        deliveryaddressId: 0,
        address1: address1 !== undefined ? address1 : "",
        address2: address2 !== undefined ? address2 : "",
        landmark: apartment !== undefined ? apartment : "",
        city: city !== undefined ? city : "",
        zipcode: postalcode !== undefined ? postalcode : "",
        contactno: "",
        contactname: "",
        latitude,
        longitude,
        state: state !== undefined ? state : "",
        country: country !== undefined ? country : "",
        addresstype: 0,
        businessname:
          businessname !== undefined && businessname ? businessname : "",
      };

      DeliveryAddressServices.verifyDeliveryAddresss(
        obj,
        restaurantId as number,
        locationId as number
      ).then((result) => {
        if (result) {
          if (userinfo) {
            DeliveryAddressServices.addDeliveryAddress(
              obj,
              restaurantId as number,
              locationId as number
            ).then((response) => {
              if (response) {

                let addressId = {
                  customerAddressId: response?.customerAddressId,
                };
                dispatch(updateAddressId(addressId));
                obj.deliveryaddressId = response?.customerAddressId;
                dispatch(selecteddeliveryaddress({ ...response, ...obj }));
                handleToggleTimingModal?.(true);
              }
            });
          } else {
            if (!isRegister) {
              if (tempDeliveryAddress) {
                dispatch(AddTempDeliveryAddress(null));
              }
              handleToggleTimingModal?.(true);
              handleNotify(
                "Address added successfully!",
                ToasterPositions.TopRight,
                ToasterTypes.Success
              );
              dispatch(AddTempDeliveryAddress(obj));
            } else {
              dispatch(registerAddress(obj));
              handleNotify(
                "Address added successfully!",
                ToasterPositions.TopRight,
                ToasterTypes.Success
              );
            }
          }
          handleToggleAddAddressModal(false);
        }
      });

      setQuery("");
      setAddressField({
        businessname: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalcode: "",
        country: "",
        apartment: "",
        latitude: 0,
        longitude: 0,
      });
    }
    setIsResetQuery(!isResetQuery);
  };

  return (
    <>
      <div
        className={`modal fade modal-your-order address-modal ${
          isOpenModal ? "show d-block" : ""
        }`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5 className="modal-title fs-5" id="staticBackdropLabel">
              Add New Address
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleToggleAddAddressModal(false)}
            />
            <form>
              <div className="modal-body">
                <div className="row mt-3">
                  <div className="col-lg-12 mb-4 col-md-12 col-12">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-12">
                        <label>Find your address</label>
                        <GoogleAutoComplete
                          className="form-control"
                          sendToParent={sendToParent}
                          isResetQuery={isResetQuery}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>Address 1</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address 1"
                          value={addressField.address1}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              address1: e.target.value,
                            })
                          }
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>Address 2</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address 2"
                          value={addressField.address2}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              address2: e.target.value,
                            })
                          }
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>Enter Apt. Buzzer...</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Apt, Buzzer,…"
                          value={addressField.apartment}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              apartment: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          value={addressField.city}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              city: e.target.value,
                            })
                          }
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>Province/State</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Province/State"
                          value={addressField.state}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              state: e.target.value,
                            })
                          }
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal Code"
                          value={addressField.postalcode}
                          onChange={(e) =>
                            setAddressField({
                              ...addressField,
                              postalcode: e.target.value,
                            })
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  className="btn-default w-100"
                  onClick={handleClickSaveAddress}
                >
                  Save Address
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default AddAddress;
