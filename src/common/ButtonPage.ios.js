import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base';

const ButtonPage = ({onPress, title}) => (
    <View>
        <Button rounded light
                style={styles.button}
                onPress={onPress}>
            <Text style={styles.buttonText}> {title} </Text>
        </Button>
    </View>
);

const styles = StyleSheet.create({
    button: {
        padding: 20,
        margin: 15,
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#FFFFFF'
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    }

});

export default ButtonPage;
