import React from 'react';
import CommonModal from '../common/common-model.component';

interface UserExistProps {
    handleClickBtn1: () => void;
    handleToggle: (value: boolean) => void;
    isOpenModal: boolean;
}

const UserExist: React.FC<UserExistProps> = ({
    handleClickBtn1,
    handleToggle,
    isOpenModal
}) => {
    return (
        <CommonModal
            title={`User Exist`}
            btn1Name="Login"
            keyName="openUserExistModal"
            isbtn2={false}
            handleClickBtn1={handleClickBtn1}
            handleToggle={handleToggle}
            isOpenModal={isOpenModal}
        >
            <h6 className="red-text">User Already exist</h6>
        </CommonModal>
    );
};

export default UserExist;
