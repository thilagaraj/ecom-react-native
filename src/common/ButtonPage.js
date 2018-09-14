import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class Buttons extends Component {

    render() {
        return (

            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.onPress}
                    disabled={this.props.disabled}>
                    <Text style={styles.buttonText}> {this.props.buttonText}</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 15,
        height: 40,
        borderColor: '#00B09B',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#00B09B',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        lineHeight: '1.2em',
        fontWeight: 'bold',
    }

});
export default Buttons;
