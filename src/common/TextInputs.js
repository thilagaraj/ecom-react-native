import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';

class TextInputs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TextInput
                style={styles.textInput}
                placeholder={this.props.placeHolderText}
                maxLength={this.props.maxLengthVal}
                placeholderTextColor="#777777"
                onChange={this.props.onChange}
                onChangeText={this.props.onChangeText}
                onKeyPress={this.props.onKeyPress}
                keyboardType={this.props.keyboardType}
                underlineColorAndroid="transparent"
            />

        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 360,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 20,
        fontFamily: 'intial',
        textAlign: 'left',
        padding: 5,
        margin: 20
    }
});


export default TextInputs;
