"use client";

import React from 'react';

import { GetThemeDetails } from '../../common/utility';
import { useRouter, useParams } from "next/navigation"; import useUtility from '../../customhooks/utility-hook';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { RegisterServices } from '../../../../redux/register/register.services';
import CommonModal from '../common/common-model.component';

interface AccountConfirmationProps {
    isOpenModal: boolean;
    handleToggle?: (value: boolean, keyName?: string) => void;
    handleToggleAddAddressModal: (value: boolean) => void;
    isAddressModalOnBcChemical: boolean;
    handleToggleAccountConfirm: (value: boolean) => void;
}

const AccountConfirmation: React.FC<AccountConfirmationProps> = ({
    isOpenModal,
    handleToggle,
    handleToggleAddAddressModal,
    isAddressModalOnBcChemical,
    handleToggleAccountConfirm,
}) => {
    const { restaurantinfo, userinfo } = useReduxData();
    const customerId = userinfo ? userinfo.customerId : 0;
    const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);
    const router = useRouter();
    const params = useParams() as { dynamic?: string; location?: string };
    const dynamic = params.dynamic ?? "";
    const location = params.location ?? "";
    const restaurantUrl = `${selctedTheme?.url}/${dynamic}`;
    const requesturl =
        typeof window !== "undefined"
            ? `${window.location.origin}/${restaurantUrl}/confirmation?code=`
            : "";
    const { isRewardTip } = useUtility();

    const handleResendClick = () => {
        if (!restaurantinfo) return;
        RegisterServices.sendVerificationEmail(
            restaurantinfo.restaurantId,
            restaurantinfo.defaultlocationId,
            requesturl,
            customerId
        ).then(() => {
            handleToggleAccountConfirm(false);
            handleToggle?.(true, 'openSendEmailConfirm');
        });
    };

    const handleClose = () => {
        handleToggleAccountConfirm(false);

        if (isAddressModalOnBcChemical) {
            handleToggleAddAddressModal(true);
        }

        if (isRewardTip && restaurantinfo?.defaultLocation?.enableRewardPoint) {
            handleToggle?.(true, 'openRewardModal');
        }
    };

    return (
        <CommonModal title="Account Confirmation"
            text={"Thank you for registering! To continue with your order, please verify your email. We've emailed the link to you. Simply click on it to get started."}
            btn1Name='Resend'
            btn2Name='Cancel'
            isbtn2={true}
            handleClickBtn1={handleResendClick}
            handleClickBtn2={handleClose}
            handleToggle={handleToggleAccountConfirm}
            isOpenModal={isOpenModal}
        />
    );
};

export default AccountConfirmation;
