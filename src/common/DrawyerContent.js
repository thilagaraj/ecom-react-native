import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.redirectHome = this.redirectHome.bind(this);
        this.redirectOrderHistory = this.redirectOrderHistory.bind(this);
    }

    redirectHome() {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            this.props.navigator.push({
                screen: 'Home',
                title: 'Home',
            });
            this.props.navigator.toggleDrawer({
                side: "left",
                animated: true,
                to: "close"
            });
        }
    }

    redirectOrderHistory() {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            this.props.navigator.push({
                screen: 'OrderHistory',
                title: 'OrderHistory',
            });
            this.props.navigator.toggleDrawer({
                side: "left",
                animated: true,
                to: "close"
            });
        }
    }

    render() {
        const iconSize = 35;
        const backgroundColor = "rgba(0,0,0,0.9)";
        const editIcon = (<Icon name="pencil" size={30} color="#fff"/>);
        const homeIcon = (<Icon name="home" size={iconSize} color={backgroundColor}/>);
        const profileIcon = (<Icon name="user" size={iconSize} color={backgroundColor}/>);
        const orderIcon = (<Icon name="history" size={iconSize} color={backgroundColor}/>);
        const noteIcon = (<Icon name="sticky-note-o" size={iconSize} color={backgroundColor}/>);
        const aboutIcon = (<Icon name="user-md" size={iconSize} color={backgroundColor}/>);
        const referalIcon = (<Icon name="users" size={iconSize} color={backgroundColor}/>);
        const cartIcon = (<Icon name="cart-plus" size={iconSize} color={backgroundColor}/>);


        const {
            container, header, headerPhone, headerTitle, mainContent, borderRound, subHeaderTitle,
            contentRowStyle, innerStyle, textStyle
        } = styles;
        return (
            <View style={container}>
                <View style={header}>
                    <View>
                        <View style={borderRound}/>
                    </View>
                    <View>
                        <Text style={headerTitle}>User Name</Text>
                        <Text style={subHeaderTitle}>9843191208</Text>
                    </View>
                    <View>
                        {editIcon}
                    </View>
                </View>
                <View style={mainContent}>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {homeIcon}
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={this.redirectHome}>
                                <Text style={textStyle}>Home</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {profileIcon}
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyle}>Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {orderIcon}
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.redirectOrderHistory}>
                                <Text style={textStyle}>Order History</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {noteIcon}
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyle}>Customer Care / Feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {aboutIcon}
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyle}>About us</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {referalIcon}
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyle}>Referral</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={contentRowStyle}>
                        <View style={innerStyle}>
                            {cartIcon}
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text style={textStyle}>Bulk Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    borderRound: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#40A248',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    headerTitle: {
        fontSize: 25,
        color: '#fff'
    },
    contentTitle: {
        padding: 0
    },
    subHeaderTitle: {
        fontSize: 18,
        color: '#fff'
    },
    mainContent: {
        flex: 3,
        padding: 10,
        width: '100%',
    },
    contentRowStyle: {
        padding: 10,
        //flex:1,    
        flexDirection: 'row',
    },
    innerStyle: {
        paddingLeft: 15
        //width: '50%',
        //backgroundColor: 'white'
    },
    textStyle: {
        paddingRight: 30,
        paddingLeft: 30,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 25,
        color: '#000'
    }

});

export default DrawerContent;
