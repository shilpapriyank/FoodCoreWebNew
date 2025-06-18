"use client";

import React, { useState, FormEvent } from "react";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { RegisterServices } from "../../../../redux/register/register.services";
import CommonModal from "../common/common-model.component";

interface RegisterProps {
    isOpenModal: boolean;
    handleToggle: (open: boolean, keyName?: string) => void;
    handleOpenLoginModal: (open: boolean) => void;
    handleToggleAccountConfirm: (open: boolean) => void;
    openAdressModal: boolean;
    handleToggleAddAddressModal: (open: boolean) => void;
}

export const Register: React.FC<RegisterProps> = ({
    isOpenModal,
    handleToggle,
    handleOpenLoginModal,
    handleToggleAccountConfirm,
    openAdressModal,
    handleToggleAddAddressModal,
}) => {
    const { restaurantinfo } = useReduxData();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!firstName.trim()) errs.firstName = "First name required";
        if (!lastName.trim()) errs.lastName = "Last name required";
        if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Valid email required";
        if (phone.trim().length < 6) errs.phone = "Valid phone required";
        if (password.length < 6) errs.password = "Password ≥ 6 chars";
        if (confirmPassword !== password) errs.confirmPassword = "Passwords must match";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);

        RegisterServices.twilioSendCode(
            restaurantinfo.restaurantId,
            restaurantinfo.enableotpauthentication,
            restaurantinfo.smsapigateway,
            restaurantinfo.mobilenumber
        )
            .then((res: any) => {
                setSubmitting(false);
                if (res.success) {
                    // close register, open account confirm
                    handleToggle(false, "openRegisterModal");
                    handleToggleAccountConfirm(true);
                } else {
                    setErrors({ form: res.message || "Registration failed" });
                }
            })
            .catch((err: any) => {
                setSubmitting(false);
                setErrors({ form: err.message || "Registration error" });
            });
    };

    return (
        <CommonModal
            title="Create Your Account"
            btn1Name="Register"
            btn2Name="Back to Login"
            isbtn2={true}
            // handleClickBtn1={handleSubmit}
            handleClickBtn2={() => {
                handleToggle(false, "openRegisterModal");
                handleOpenLoginModal(true);
            }}
            handleToggle={handleToggle}
            keyName="openRegisterModal"
            isOpenModal={isOpenModal}
        >
            <form onSubmit={handleSubmit} noValidate>
                {errors.form && <p className="error">{errors.form}</p>}

                <div className="row">
                    <div className="col-6">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <small className="error">{errors.firstName}</small>}
                    </div>
                    <div className="col-6">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <small className="error">{errors.lastName}</small>}
                    </div>
                </div>

                <div className="mt-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <small className="error">{errors.email}</small>}
                </div>

                <div className="mt-3">
                    <label>Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <small className="error">{errors.phone}</small>}
                </div>

                <div className="mt-3 row">
                    <div className="col-6">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <small className="error">{errors.password}</small>}
                    </div>
                    <div className="col-6">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
                    </div>
                </div>
            </form>
        </CommonModal>
    );
};

export default Register;
