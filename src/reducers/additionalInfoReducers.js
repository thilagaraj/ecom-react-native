import * as types from '../constants/types';
import initialState from './initialState';

export default function additionalInfoReducer(state = initialState.additionalInfo, action) {

    switch (action.type) {

        case types.USER_REGISTERATION_STATUS:
            return [
                ...state,
                Object.assign({}, {additionalInfo: action.additionalInfo})
            ];

        case types.SET_IP_ADDRESS: {
            return [
                ...state,
                Object.assign({}, {additionalInfo: action.additionalInfo})
            ];
        }
        default:
            return state;
    }

}
