import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const TextPage = ({onPress, style, text}) => (
    <View>
        <Text
            style={[styles.textStyles, style]}
            onPress={onPress}>
            {text}
        </Text>
    </View>
);
const styles = StyleSheet.create({
    textStyles: {
        textAlign: 'center',
        justifyContent: 'center',
        margin: 10,
        ...Platform.select({
            ios: {
                color: '#40A248',
            },
            android: {
                color: '#40A248',
            },
            web: {
                color: '#FFFFFF',
            },
        }),
    },
});

export default TextPage;
