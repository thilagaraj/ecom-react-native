import * as types from '../constants/types';
import _ from 'lodash';

//to register distributor
export function registerDistributor(distributorDetails) {
    return {
        type: types.REGISTER_DISTRIBUTOR,
        distributorDetails
    };
}
