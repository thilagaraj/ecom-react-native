import React from 'react';

import {Text, View} from 'react-native'

class Home extends React.Component {
    render() {
        const {homeStyle} = styles;
        return (
            <View style={homeStyle}>
                <Text>Home</Text>
            </View>
        );
    }
}

const styles = {
    homeStyle: {
        flex: 1,
        backgroundColor: '#40A248'
    }
};

export default Home;