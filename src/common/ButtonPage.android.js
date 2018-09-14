import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

const ButtonPage = ({onPress, buttonText, width}) => {
    const widthShow = {
        width: width
    };
    return (
        <View style={styles.buttonView}>
            <Button rounded light
                    onPress={onPress}
                    style={[styles.buttonStyle, widthShow]}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Button>
        </View>
    );
};
const styles = StyleSheet.create({
    buttonView: {
        //flex:1,
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#03ada7',
        //borderColor: '#40A248',
        borderRadius: 30,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default ButtonPage;
