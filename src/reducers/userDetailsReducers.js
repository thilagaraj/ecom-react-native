import * as types from '../constants/types';
import initialState from './initialState';

export default function userDetailsReducer(state = initialState.userDetails, action) {
    switch (action.type) {
        case types.GET_STATUS:
            return [
                ...state,
                Object.assign({}, action.userDetails)
            ];

        case types.REGISTER_MOBILE_NUMBER:
            return [
                ...state,
                Object.assign({}, action.userDetails)
            ];

        case types.SET_USER_DETAILS:
            return [
                ...state,
                Object.assign({}, action.userDetails)
            ];

        default:
            return state;
    }

}
