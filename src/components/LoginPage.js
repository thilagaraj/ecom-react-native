import React, {Component, PropTypes} from 'react';
import {Image, StyleSheet, View, Platform} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';

import InputPage from '../common/TextInputs';
import ButtonPage from '../common/ButtonPage';
import * as commonUtils from '../common/CommonUtils';

import * as userDetailsActions from '../actions/userDetailsAction';
import * as additionalInfoAction from '../actions/additionalInfoAction';
import configureStore from '../store/configureStore';

import * as serviceCalls from '../constants/serviceCallsURI';
import * as fieldTypes from '../constants/fieldTypes';

// require json file to get constants
let content = require('../common/content.json');

const store = configureStore();

let userDetails, additionalInfo, isUserRegistered;

class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
        isError:  content.falseValue,
        errorText: content.mobileNumberErrorText,
        disabled: content.trueValue,
        phone: '',
    };

    this.validateNumber = this.validateNumber.bind(this);
    this.getOTP = this.getOTP.bind(this);
    this.setDisability = this.setDisability.bind(this);
    this.userRegistrationStatus= this.userRegistrationStatus.bind(this);
    this.clearInput= this.clearInput.bind(this);
  }

  componentWillMount() {
    if (Platform.OS !== 'web'){
      this.props.navigator.setDrawerEnabled({ side: 'left', enabled: false });
    }
    userDetails = store.dispatch(userDetailsActions.getStatus(store.getState().userDetails)).userDetails;
    // userDetails = commonUtils.getDeviceInformation(userDetails);
    additionalInfo = store.getState().additionalInfo;
		commonUtils.getIpAddress().then(function(resolve){
							  additionalInfo[fieldTypes.IP_ADDRESS] = resolve
	              store.dispatch(additionalInfoAction.setUserIPAddress(additionalInfo));
               })
               .catch(function(reject){
                 console.log(reject);
							 });
   isUserRegistered = store.dispatch(additionalInfoAction.setUserRegistartionStatus(additionalInfo))
       .additionalInfo.isUserRegistered;
	}
  //Function to validate the mobile number

  validateNumber(value) {
    if (!_.isNaN(_.toNumber(value)) && !_.isEmpty(value)) {
        userDetails[fieldTypes.PHONE] =  value;
        this.setState({
          disabled: content.trueValue,
          phone: value
        });
    }

    if (!_.isUndefined(userDetails.phone) && _.isEqualWith(userDetails.phone.length, content.mobileNumberMaxLength)) {
         this.userRegistrationStatus(userDetails.phone);
         this.setDisability(content.falseValue);
    }
  }

  //Function to sent OTP to the mobile number
  getOTP() {
      let url = serviceCalls.SEND_OTP  +
      userDetails.phone;
      let self = this;
      let response = '';
      userDetails = commonUtils.getDeviceInformation(userDetails);
      
      if (!_.isUndefined(userDetails.phone) && _.isEqualWith(userDetails.phone.length, content.mobileNumberMaxLength)) {
        commonUtils.getServiceCallPromise(url)
                   .then(function(resolve) {
                          response = content.verificationCodeSentStatus;
                          self.setDisability(content.falseValue);
                          store.dispatch(userDetailsActions.registerMobileNumber(userDetails));
                          commonUtils.pageRedirection(self.props, self.state.disabled, content.verifyAndRegisterUserScreen, content.verifyAndRegisterUserTitle, content.verifyAndRegisterUserPath);
                        })
                    .catch(function(reject){
                      console.log(content.errorLabel+reject.message);
                      response = content.errorSendingCode;
                      self.setDisability(content.trueValue);
                    }).finally(function(){
                      commonUtils.showToast(response);
                    });
      }else {
        this.setState({
            isError: content.trueValue
        });
      }


  }

  // funtion set button disablility status
  setDisability(disablility) {
  	 this.setState({
  			 disabled: disablility
  		 });
	}

  //Function to check if user is already registered
  userRegistrationStatus(phone) {
     // will be called to set the response of function call to chekc if user is already registered
     // this.props.actions.

      var self = this;
      let response = '';
          let url = serviceCalls.CUSTOMER_EXIST + phone;
          commonUtils.getServiceCallPromise(url)
              .then(function (resolve) {
                  response = content.statusOk;
                  isUserRegistered = true;

              })
              .catch(function (reject) {
                  isUserRegistered = false;

              }).finally(function () {
              commonUtils.showToast(response);
              additionalInfo[fieldTypes.IS_USER_REGISTERED]= isUserRegistered;
              store.dispatch(additionalInfoAction.setUserRegistartionStatus(additionalInfo));
        });


  }

//Fucntion to clear the text fields
  clearInput(value) {
   let keyCode = value.keyCode;

     if(_.isEqualWith(keyCode, content.backspaceKeyCode) && _.isEqualWith(this.state.phone.length, content.mobileNumberMinLength)){
         this.setState({
           phone: ''
         });
        this.setDisability(content.trueValue);
     }
 }

  render() {
      return (
        <View style={styles.container}>

          <Image
              style={styles.logo}
              source={require('../icons/logo.png')}
            />

    			 <InputPage
      	     maxLengthVal={content.mobileNumberMaxLength}
             placeHolderText={content.mobileNumberPlaceholder}
             onChangeText={this.validateNumber}
             keyboardType={content.keyBoardTypePhone}
             value={this.state.phone}
             onKeyPress={this.clearInput}
            />

         {this.state.isError && <Text style={styles.errorText}>{this.state.errorText}</Text> }

    	    <ButtonPage
    	     buttonText={content.verificationCodeButtonText}
           onPress={this.getOTP}
           disabled={this.state.disabled}/>

        </View>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userDetails: state.userDetails,
        isUserRegistered: state.isUserRegistered
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userDetailsActions, dispatch)
    }
};

const styles = StyleSheet.create({
    logo: {
        height: 85,
        width: 145,
        alignSelf: 'center'
    },
  	container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      backgroundColor: '#40A248'
    },
    errorText:{
      alignSelf: 'flex-start',
      fontSize: 10,
      color: 'red'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
