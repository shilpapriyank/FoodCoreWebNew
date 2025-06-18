import React from 'react';

import useUtility from '../../customhooks/utility-hook';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import CommonModal from '../common/common-model.component';

interface SendEmailAccountConfirmProps {
    isOpenModal: boolean;
    handleClickBtn1?: () => void;
    handleToggle?: (value: boolean, keyName?: string) => void;
    keyName?: string;
    handleToggleAccountConfirm?: (value: boolean) => void;
}

const SendEmailAccountConfirm: React.FC<SendEmailAccountConfirmProps> = ({
    isOpenModal,
    handleClickBtn1,
    handleToggle,
    keyName,
    handleToggleAccountConfirm,
}) => {
    const { isRewardTip } = useUtility();
    const { userinfo, restaurantinfo } = useReduxData();

    const handleClickOk = () => {
        handleToggle?.(false, keyName);
        if (isRewardTip && restaurantinfo?.defaultLocation?.enableRewardPoint) {
            handleToggle?.(true, 'openRewardModal');
        }
    };

    const handleCustomToggle = (value: boolean, keyName?: string) => {
        if (isRewardTip && restaurantinfo?.defaultLocation?.enableRewardPoint) {
            handleToggle?.(true, 'openRewardModal');
        }
        handleToggle?.(value, keyName);
    };

    return (
        <CommonModal title={`Information`}
            btn1Name='Ok'
            keyName={keyName}
            isbtn2={false}
            handleClickBtn1={handleClickOk}
            handleToggle={handleCustomToggle}
            isOpenModal={isOpenModal} >
            <h6 className='text-center'>Thank you</h6>
            <p>{`Email has been resent to your id ${userinfo?.emailId}.`}</p>
            <p>Please click on the link in the email to complete your registration</p>
        </CommonModal>
    );
};

export default SendEmailAccountConfirm;
