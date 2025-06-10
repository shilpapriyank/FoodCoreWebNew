'use client';

import { useState } from "react";

const AddAddress = () => {
    const [addressField, setaddressField] = useState({
        businessname: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalcode: "",
        country: "",
        apartment: "",
        latitude: "",
        longitude: ""
    })
    return (
        <>
            <h1>From Add Address</h1>
        </>
    )
}

export default AddAddress;