import * as types from '../constants/types';

//to register mobile number
export function registerMobileNumber(userDetails) {
    return {
        type: types.REGISTER_MOBILE_NUMBER,
        userDetails
    };
}

//to get intial state
export function getStatus(userDetails) {
    return {
        type: types.GET_STATUS,
        userDetails
    };
}

//to get intial state
export function setUserDetails(userDetails) {
    return {
        type: types.SET_USER_DETAILS,
        userDetails
    };
}
