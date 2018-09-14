import * as types from '../constants/types';
import initialState from './initialState';

export default function distributorDetailReducer(state = initialState.distributorDetails, action) {

  switch (action.type) {
    case types.REGISTER_DISTRIBUTOR:
      return [
        ...state,
        Object.assign({}, {distributorDetails: action.distributorDetails})
      ];
    default:
        return state;
    }

}
