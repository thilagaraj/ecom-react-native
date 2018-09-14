import React, {Component} from 'react';
import {StyleSheet, View,} from 'react-native';
import {connect, dispatch} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';

import InputPage from '../common/TextInputs';
import ButtonPage from '../common/ButtonPage';
import TextPage from '../common/TextPage';

import * as distributorActions from '../actions/distributorDetailAction';
import * as fieldTypes from '../constants/fieldTypes';
import * as commonUtils from '../common/CommonUtils';
import * as serviceCalls from '../constants/serviceCallsURI';

import configureStore from '../store/configureStore';

// require json file to get constants
let content = require('../common/content.json');

const store = configureStore();
let distributorDetails = distributorActions.registerDistributor(store.getState().distributorDetails).distributorDetails;

class DistributorReferralPage extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			errors: {},
			disabled: content.trueValue,
			name:'',
			number:'',
			isValidName: content.falseValue,
			isValidNumber: content.falseValue
		};

		this.getDistributorName = this.getDistributorName.bind(this);
		this.getDistributorNumber = this.getDistributorNumber.bind(this);
		this.registerDistributorDetails = this.registerDistributorDetails.bind(this);
		this.setRedirection = this.setRedirection.bind(this);
	}

	getDistributorName(name) {

	if (!_.isEmpty(name)) {
			distributorDetails[fieldTypes.DISTRIBUTOR_NAME] = name;
			this.setState({
				isValidName: content.trueValue,
				name: name
			});
		}else{
			this.setState({
				isValidName: content.falseValue
			});
		}
	}

	getDistributorNumber(number) {

		if (!_.isNaN(_.toNumber(number)) && !_.isEmpty(number)) {
			distributorDetails[fieldTypes.DISTRIBUTOR_NUMBER] = number;
			this.setState({
				isValidNumber: content.trueValue,
				number: number
			});
		} else {
			event.target.value = distributorDetails.distributorNumber;
			this.setState({
				isValidNumber: content.falseValue
			});
		}
	}

	registerDistributorDetails() {
		distributorDetails[fieldTypes.CUSTOMER_ID] = 1;
		store.dispatch(distributorActions.registerDistributor(distributorDetails));

		let url = serviceCalls.DISTRIBUTOR_REFERRAL;
		var response  = '';

		let requestBody = commonUtils.serlializeData(distributorDetails);
		let self = this;

		if(!_.isEmpty(requestBody)){
			commonUtils.postServiceCallPromise(url, requestBody)
								 .then(function(resolve) {
												response = content.referralSuccessfullStatus;
												self.setRedirection();
											})
									.catch(function(reject){
										console.log(content.errorLabel+reject.message);
										response = content.errorReferringDistributor;
									}).finally(function(){
                    commonUtils.showToast(response);
                  });
			}
	}

	setRedirection(){
		commonUtils.pageRedirection(this.props, false, content.orderPageScreen, content.orderPageTitle, content.orderPagePath);
	}

   render(){

         return(
				        <View style={styles.container}>
					          <TextPage
										  style={styles.fontSize20}
						          text={content.distributorReferralLabel}/>

										<TextPage
										  style={styles.fontSize10}
						          text={content.referralCashbackLabel}/>

						    		<InputPage
							    		placeHolderText={content.distributorNamePlaceholder}
							    		onChangeText={this.getDistributorName}
											value={this.state.name}/>

						    		<InputPage
							    		maxLengthVal={content.mobileNumberMaxLength}
							    		placeHolderText={content.distributorMobileNumberPlaceholder}
							    		onChangeText={this.getDistributorNumber}
											value={this.state.number}
											keyboardType={content.keyBoardTypePhone}/>

					          <ButtonPage
						           buttonText={content.referButtonText}
						           onPress={this.registerDistributorDetails}
						           disabled={!(this.state.isValidNumber) && !(this.state.isValidName) }/>

										 <TextPage
 										  style={styles.fontSize20}
											onPress={this.setRedirection}
 						          text={content.skipButtonText}/>

				          </View>
         	);
      }
  }

const mapStateToProps = (state, ownProps) => {
    return {
        distributorDetails: state.distributorDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(distributorActions, dispatch)
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    fontSize20: {
        fontSize: 20
    },
    fontSize10: {
        fontSize: 10
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DistributorReferralPage);
