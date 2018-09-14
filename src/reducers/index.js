import {combineReducers} from 'redux';
import userDetails from './userDetailsReducers';
import distributorDetails from './distributorDetailsReducers';
import additionalInfo from './additionalInfoReducers';

const rootReducer = combineReducers({
    userDetails,
    distributorDetails,
    additionalInfo,
});


export default rootReducer;
