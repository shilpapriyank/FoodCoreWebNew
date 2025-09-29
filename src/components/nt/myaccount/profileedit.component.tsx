import { FormValues } from "@/types/myaccount-types/myaccount.type";
import React from "react";

const ProfileEdit = ({ values }: { values: FormValues }) => {
  return (
    <>
      {values.businessname && (
        <div
          className={`col-md-${
            values.businessname !== "" ? "3" : "6"
          } col-12 mb-3`}
        >
          <p className="fw-bold fs-6 mb-1">Business Name</p>
          <p className="grey-text fw-bold fs-6">{values.businessname || ""}</p>
        </div>
      )}

      <div className={`col-md-${values.businessname ? "3" : "6"} col-12 mb-4`}>
        <p className="fw-bold fs-6 mb-1">First Name</p>
        <p className="grey-text fw-bold fs-6">{values.firstname || ""}</p>
      </div>
      <div className={`col-md-${values.businessname ? "3" : "6"} col-12 mb-4`}>
        <p className="fw-bold fs-6 mb-1">Last name</p>
        <p className="grey-text fw-bold fs-6">{values.lastname || ""}</p>
      </div>
      <div className="col-lg-6 col-md-6 col-12 ">
        <p className="fw-bold fs-6 mb-1">Email</p>
        <p className="grey-text fw-bold fs-6">{values.emailId || ""}</p>
      </div>
      <div className="col-lg-6 col-md-6 col-12">
        <p className="fw-bold fs-6 mb-1">Phone Number</p>
        <p className="grey-text fw-bold fs-6">{values.phone || ""}</p>
      </div>
      {/* <div className="col-lg-6 col-md-6 col-12">
                <p className='fw-bold fs-6'>Last name</p>
                <p className='fw-bold fs-6'>Last name</p>
            </div>
            <div className="col-lg-12 col-md-12 col-12">
                <p className='fw-bold fs-6'>Last name</p>
                <p className='fw-bold fs-6'>Last name</p>
            </div> */}
    </>
  );
};

export default ProfileEdit;
