import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text,} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import * as userDetailsActions from '../actions/userDetailsAction';
import * as additionalInfoAction from '../actions/additionalInfoAction';
import configureStore from '../store/configureStore';

import * as regex from '../constants/regexValidator';
import * as serviceCalls from '../constants/serviceCallsURI';
import * as fieldTypes from '../constants/fieldTypes';

import * as commonUtils from '../common/CommonUtils';

import InputPage from '../common/TextInputs';
import ButtonPage from '../common/ButtonPage';
import TextPage from '../common/TextPage';
// import Countdown from 'react-countdown-now';

// require json file to get constants
let content = require('../common/content.json');

const store = configureStore();

let userDetails, additionalInfo, isUserRegistered;

class VerifyAndRegisterUserPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            nameErrorText: content.errorFullName,
            emailErrorText: content.errorEmail,
            otpErrorText: content.errorOTP,
            isValidName: content.trueValue,
            isValidEmail: content.trueValue,
            isValidOTP: content.trueValue,
            nameValue: content.empty,
            emailValue: content.empty,
            otpValue: content.empty,
        };

        this.getUserName = this.getUserName.bind(this);
        this.getUserEmailAddress = this.getUserEmailAddress.bind(this);
        this.validateOTP = this.validateOTP.bind(this);
        this.registerUserDetails = this.registerUserDetails.bind(this);
        this.resendOTP = this.resendOTP.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }

    componentWillMount() {
        userDetails = store.dispatch(userDetailsActions.getStatus(store.getState().userDetails)).userDetails;
        additionalInfo = store.getState().additionalInfo;
        isUserRegistered = store.dispatch(additionalInfoAction.setUserRegistartionStatus(additionalInfo))
            .additionalInfo.isUserRegistered;
            console.log("isUserRegistered = "+isUserRegistered);
    }

    // function to get UserName
    getUserName(value) {
        var status = content.falseValue;
        this.state.nameValue=value;
        if (!_.isEmpty(value)) {
            userDetails[fieldTypes.FULLNAME] = value;
            status = content.trueValue;
        } else {
            status = content.falseValue;
        }
        this.setState({
            isValidName: status
        });
    }

    // function to get UserEmailAddress
    getUserEmailAddress(value) {
        this.state.emailValue=value;
        var status = content.falseValue;
        if (!_.isEmpty(value) && regex.EMAIL_CONSTARINT.test(value)) {
            status = content.trueValue;
            userDetails[fieldTypes.EMAIL] = value;
        } else {
            status = content.falseValue;
        }

        this.setState({
            isValidEmail: status
        });
    }

    //function to validate OTP
    validateOTP(userOtp) {
        this.state.otpValue=userOtp;
        var self = this;
        let response = '';
        var status = content.trueValue;

        if (!_.isEmpty(userOtp) && _.isEqualWith(userOtp.length, content.otpMaxLength)) {
            //status = content.falseValue;
            let url = serviceCalls.VERIFY_OTP + this.props.userDetails.phone+"/"+userOtp;
            commonUtils.getServiceCallPromise(url)
                .then(function (resolve) {
                    response = content.validOtpStatus;
                    userDetails[fieldTypes.OTP] = userOtp;
                    status = content.trueValue;

                })
                .catch(function (reject) {
                    status = content.falseValue;

                    console.log(content.errorLabel + reject.message);
                    response = content.errorValidatingOtp;

                }).finally(function () {
                commonUtils.showToast(response);
            });


        } else {
            status = content.falseValue;

        }

       this.setState({
            isValidOTP: status
        });


    }

    // function to register/login user details
    registerUserDetails() {
        var self = this;
        let response = '';
        let url = serviceCalls.CREATE_CUSTOMER;

        store.dispatch(userDetailsActions.setUserDetails(userDetails));

        let requestBody = commonUtils.serlializeData(userDetails);

        if (!_.isEmpty(requestBody) && !this.enableButton()) {
            commonUtils.postServiceCallPromise(url, requestBody)
                .then(function (resolve) {
                    response = content.regsitrationSuccessfullStatus;
                    commonUtils.pageRedirection(self.props, self.enableButton(), content.distributorReferralScreen, content.distributorReferralTitle, content.distributorReferralPath);
                })
                .catch(function (reject) {
                    console.log(content.errorLabel + reject.message);
                    response = content.errorRegisteringUser;
                }).finally(function () {
                commonUtils.showToast(response);
            });
        }
    }

    //function to resend otp
    resendOTP() {
        let self = this;
        let response = '';
        var url = serviceCalls.RE_SEND_OTP +
            this.props.userDetails.phone;

        commonUtils.getServiceCallPromise(url)
            .then(function (resolve) {
                response = content.verificationCodeSentStatus;
            })
            .catch(function (reject) {
                console.log(content.errorLabel + reject.message);
                response = content.errorSendingCode;
            }).finally(function () {
            commonUtils.showToast(response);
        });
    }

    //function to disable the button state
    enableButton() {
        var status = content.trueValue;
        if (isUserRegistered) {
            status = !this.state.isValidOTP && !!userDetails[fieldTypes.OTP];
        } else {
            status = !(this.state.isValidName && this.state.isValidEmail && this.state.isValidOTP && this.state.nameValue && this.state.emailValue && this.state.otpValue);
            //status = !(this.state.isValidName && this.state.isValidEmail && this.state.isValidOTP);
        }
        return status;
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {isUserRegistered &&
                <View>
                    <TextPage
                        style={styles.fontSize10}
                        text={content.enterOtpLabel}
                    />
                    <TextPage
                        style={styles.fontSize10}
                        text={content.enterOtpQuestion}
                    />
                </View>
                }
                {!isUserRegistered &&
                <View>
                    <TextPage
                        style={styles.fontSize20}
                        text={content.createAccount}
                    />

                </View>
                }


                {!isUserRegistered &&
                <View>

                    <InputPage
                        placeHolderText={content.fullNamePlaceholder}
                        onChangeText={this.getUserName}
                         onSubmitEditing={this.getUserName}/>

                    {!this.state.isValidName && <Text style={styles.errorText}>{this.state.nameErrorText}</Text>}

                    <InputPage
                        placeHolderText={content.emailPlaceholder}
                        onChangeText={this.getUserEmailAddress}
                        keyboardType={content.keyBoardTypeEmail}/>

                    {!this.state.isValidEmail && <Text style={styles.errorText}>{this.state.emailErrorText}</Text>}

                </View>

                }

                <InputPage
                    maxLengthVal={content.otpMaxLength}
                    placeHolderText={content.enterOtpLabel}
                    onChangeText={this.validateOTP}
                    keyboardType={content.keyBoardTypePhone}/>

                {!this.state.isValidOTP && <Text style={styles.errorText}>{this.state.otpErrorText}</Text>}

                {
                    !isUserRegistered &&

                    <View>
                        <TextPage
                            style={styles.fontSize10}
                            text={content.termAgreeingLabel}/>

                        <TextPage
                            style={styles.fontSize15}
                            text={content.termsAndConditionLabel}
                            onPress={this.redirectTermsAndCondition}/>

                    </View>
                }

                <ButtonPage
                    buttonText={!isUserRegistered ? content.registerButtonText : content.LoginButtonText}
                    onPress={this.registerUserDetails}
                    disabled={this.enableButton()}
                />

                <TextPage
                    style={styles.fontSize20}
                    onPress={this.resendOTP}
                    text={content.reSendOtpLabel}/>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userDetails: state.userDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userDetailsActions, dispatch)
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontSize20: {
        fontSize: 20
    },
    fontSize10: {
        fontSize: 10
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 15,
        color: 'red'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAndRegisterUserPage);
