import {AlertIOS, Platform, ToastAndroid,} from 'react-native';

import request from 'superagent';

import * as serviceCalls from '../constants/serviceCallsURI';
import * as fieldTypes from '../constants/fieldTypes';
import configureStore from '../store/configureStore';

import * as additionalInfoAction from '../actions/additionalInfoAction';

var DeviceInfo = require('react-native-device-info');

let platform = require('platform');
let camelize = require('camelize');
var Promise = require("bluebird");
const store = configureStore();

export function showToast(response) {
    if (Platform.OS === 'ios') {
        AlertIOS.alert(response)
    } else if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(response, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}

export function pageRedirection(props, isRedirect, screenName, screenTitle, path) {
	if (!isRedirect && (Platform.OS === 'ios' || Platform.OS === 'android')) {
			props.navigator.push({
				 screen: screenName,
				 title: screenTitle
			});
	} else if (!isRedirect && Platform.OS === 'web') {
      // var history = require('../../history');
          props.history.push(path);
	}
}

// function to get Ip Address
export function getIpAddress(){

   return new Promise(
	        function(resolve, reject){
						request.get(serviceCalls.GET_IP_DETAILS, function(err, res){
							if(Platform.OS === 'web'){
								if(res.statusCode === 200){
									resolve(res.body.ip);
								}else if(res.statusCode !== 200){
									reject(res);
								}else {
									reject(new Error(JSON.stringify(res)));
								}
							}else{
								resolve('localhost');
							}
						});
	       });
}

//function to get device information
export function getDeviceInformation(userDetails) {
	let info = platform.parse(navigator.userAgent);
	 if(Platform.OS === 'web'){
			userDetails[fieldTypes.DEVICE_ID] = info.name;
			userDetails[fieldTypes.LOGIN_CHANNEL] = info.name;
			userDetails[fieldTypes.REFERRAL_CODE] = "NA";
			userDetails[fieldTypes.USER_AGENT] = info.description;
			userDetails[fieldTypes.IP_ADDRESS] = store.getState().additionalInfo.ipAddress;
		}

    if (Platform.OS === 'ios' || Platform.OS === 'android') {

        userDetails[fieldTypes.DEVICE_ID] = info.name;
        userDetails[fieldTypes.LOGIN_CHANNEL] = info.name;
        userDetails[fieldTypes.REFERRAL_CODE] = "NA";
        userDetails[fieldTypes.USER_AGENT] = info.description;
        userDetails[fieldTypes.IP_ADDRESS] = store.getState().additionalInfo.ipAddress;

			console.log(userDetails);
 //TODO: Need to update this
			// userDetails[fieldTypes.DEVICE_ID] = DevieInfo.getDeviceId();
			// userDetails[fieldTypes.LOGIN_CHANNEL] = DevieInfo.getSystemName();
			// userDetails[fieldTypes.REFERRAL_CODE] = "NA";
			// userDetails[fieldTypes.USER_AGENT] = DevieInfo.getUserAgent();
		}

    // userDetails[fieldTypes.IP_ADDRESS] = (Platform.OS === 'android') ? DevieInfo.getIPAddress() :
    // 									(store.getState().additionalInfo.ipAddress);

    return userDetails;

}

export function serlializeData(data) {
    return (JSON.stringify(Object.keys(data)
        .sort()
        .reduce((a, v) => {
            a[v] = data[v];
            return a;
        }, {})));
}

//Promise for GET call
export function getServiceCallPromise(serviceUrl) {

    return new Promise(function (resolve, reject) {
        request.get(serviceUrl, function (err, res) {

				if(res.body.status === "OK"){
				  resolve(true);
				}else{
					console.log(res);
          reject(new Error(JSON.stringify(res)));
				}
			});
	});

}

//Promise for POST call
export function postServiceCallPromise(serviceUrl, requestBody) {

	return new Promise(function(resolve, reject){
		request.post(serviceUrl)
				 .set('Content-Type', 'application/json')
				 .accept('application/json')
				 .send(requestBody)
				 .end(function(err, res) {
					  if (res.body.status === "OK") {
		 				  resolve(true);
		 				} else {
		 					reject(new Error(JSON.stringify(res)));
		 				}
				 });
	});

}
