import * as types from '../constants/types';

// to set user registartion status
export function setUserRegistartionStatus(additionalInfo) {
    return {
        type: types.USER_REGISTERATION_STATUS,
        additionalInfo
    };
}

//to set user registartion status
export function setUserIPAddress(additionalInfo) {
    return {
        type: types.SET_IP_ADDRESS,
        additionalInfo
    };
}
