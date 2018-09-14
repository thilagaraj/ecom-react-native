import React, {Component} from 'react';
import {StyleSheet, View,} from 'react-native';
import {connect, dispatch} from "react-redux";
import {bindActionCreators} from "redux";
import InputPage from '../common/TextInputs';
import ButtonPage from '../common/ButtonPage';
import TextPage from '../common/TextPage';

import configureStore from '../store/configureStore';

const store = configureStore();

class BulkOrder extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {}
        };

    }

    render() {
        const {container, buttonContainerStyle, buttonStyle, headerTextStyle, inputContainer, headerViewStyle, inputStyles} = styles;
        return (
            <View style={container}>
                <View style={inputContainer}>
                    <View style={headerViewStyle}>
                        <TextPage
                            style={headerTextStyle}
                            text='We take Bulk Order all over chennai'/>
                    </View>
                    <View style={inputStyles}>
                        <InputPage
                            name="bottleType"
                            placeHolderText="Specify Cane or Bottle Type"
                        />
                        <InputPage
                            name="quantity"
                            placeHolderText="Quantity"
                        />
                        <InputPage
                            name="occasion"
                            placeHolderText="Occasion"
                        />
                        <InputPage
                            name="deliverydatetime"
                            placeHolderText="Delivery Date / Time"
                        />
                    </View>
                    <View style={buttonContainerStyle}>
                        <View style={buttonStyle}>
                            <ButtonPage
                                destination="/loginPage"
                                buttonText="Bulk Order Request"
                                width={350}
                            />
                        </View>
                    </View>
                </View>
            </View>
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
        actions: bindActionCreators(userActions, dispatch)
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0101'
    },
    headerViewStyle: {
        marginLeft: 10
    },
    headerTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
        marginLeft: 10
    },
    fontSize10: {
        fontSize: 10
    },
    buttonContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonStyle: {
        padding: 10
    },
    inputContainer: {
        flex: 0.8,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    inputStyles: {
        padding: 0
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BulkOrder);
