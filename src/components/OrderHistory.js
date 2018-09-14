import React from 'react';

import {FlatList, ScrollView, Text, View} from 'react-native'
import request from 'superagent';
import * as serviceCalls from '../constants/serviceCallsURI';

class OrderHistory extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            OrderHistoryItems: [],
            cusomerId: 4
        };
        this.getOrderHistory = this.getOrderHistory.bind(this);
        this.setOrderHistoryItems = this.setOrderHistoryItems.bind(this);
    }

    componentWillMount() {
        this.getOrderHistory();
    }

    setOrderHistoryItems(OrderHistoryItem) {
        this.setState({OrderHistoryItems: OrderHistoryItem})
    }

    getOrderHistory() {
        var url = serviceCalls.ORDER_HISTORY + this.state.cusomerId;
        var self = this;
        request.get(url, function (err, res) {
            var response = '';
            console.log(res.body.result);
            if (res.body.status === "OK") {
                self.setOrderHistoryItems(res.body.result)
            }
        });
    }

    FlatListItemSeparator = () => {
        return (
            <View style={styles.itemSepStyle}/>
        );
    };

    render() {
        console.log(this.state.setOrderHistoryItems);
        const {
            container,
            orderDateStyle,
            orderStyle,
            orderStatusStyle,
            subTitle,
            textStyle,
            itemTitle,
            listViewStyle,
            listStyle,
            orderDiscountStyle,
            orderDateTextStyle,
            mainListStyle,
            itemSepStyle,
            borderStyle,
            boxStyle
        } = styles;
        return (
            <ScrollView contentContainerStyle={container}>
                <FlatList
                    data={this.state.OrderHistoryItems}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({item}) =>
                        <View style={listStyle}>
                            <View style={listViewStyle}/>
                            <View style={mainListStyle}>
                                <View>
                                    <Text style={itemTitle}>No. of Cane : {item.quantity}</Text>
                                    <Text style={subTitle}> {item.price}</Text>
                                    <View style={borderStyle}>
                                    </View>
                                    <View style={boxStyle}>
                                        <View>
                                            <Text>Order ID</Text>
                                            <Text style={orderStyle}>{item.id}</Text>
                                        </View>
                                        <View>
                                            <Text>Date:</Text>
                                        </View>
                                        <View>
                                            <Text style={orderDateStyle}>{item.deliveryDate}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={orderStatusStyle}>Status: {item.status}</Text>
                                    </View>
                                    <View>
                                        <Text style={orderDiscountStyle}>Discount:{item.discount}</Text>
                                    </View>
                                    <View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
            </ScrollView>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        color: '#000',
        margin: 1,
        padding: 5,
        backgroundColor: 'transparent'
    },
    listStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirectio: 'row',
        paddingBottom: 50
    },
    listViewStyle: {
        flex: 0.01,
        height: 80,
        width: 5,
    },
    itemTitle: {
        fontSize: 20,
        left: 10,
        fontWeight: 'bold',
        position: 'relative',
        padding: 10
    },
    subTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        right: 10,
        position: 'absolute'
    },
    orderStyle: {
        fontSize: 20,
        left: 10,
        position: 'relative',
        padding: 10
    },
    orderDateStyle: {
        fontSize: 22,
        paddingBottom: 5,
        marignRight: 10
    },
    orderTextStyle: {
        fontSize: 18
    },
    orderDateTextStyle: {
        padding: 2
    },
    orderStatusStyle: {
        color: 'blue',
        fontSize: 20
    },
    orderDiscountStyle: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        fontSize: 18
    },
    mainListStyle: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    itemSepStyle: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        backgroundColor: "#fff",
    },
    borderStyle: {
        borderBottomWidth: 1,
        margin: 5,
        borderBottomColor: '#ccc'
    },
    boxStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
};
export default OrderHistory;