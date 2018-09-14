import React, {Component} from 'react';
import {Image, View, StyleSheet, Platform, } from 'react-native';
import ButtonPage from '../common/ButtonPage';
import TextPage from '../common/TextPage';

// import OcticonPencil from 'react-native-vector-icons/Octicons';

class OrderPage extends Component {
    componentWillMount() {
      if (Platform.OS !== 'web'){
        this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
      }
    }

    render() {

        return (

                <View style={styles.mainConatiner}>

                    <TextPage
                        style={styles.fontSize20}
                        text='Place Order'/>
                    <View style={styles.editAddressBlock}>
                        <TextPage
                            style={[styles.fontSize20, {textAlign: 'left'}]}
                            text='Edit Address'/>
                    </View>

                    <View style={styles.orderBlock}>

                        <View>
                            <Image
                                style={styles.waterCane}
                                source={require('../icons/waterCane.png')}
                            />
                        </View>
                        <View>
                            <TextPage
                                style={styles.fontSize10}
                                text='&#8377;40'/>
                            <TextPage
                                style={styles.fontSize10}
                                text='Quantity'/>
                            <TextPage
                                style={styles.fontSize10}
                                text='Discount: &#8377;10'/>
                            <TextPage
                                style={styles.fontSize10}
                                text='Post Delivery Cashback: &#8377;10 '/>
                        </View>

                    </View>

                    <View style={styles.block}>
                        <TextPage
                            style={styles.fontSize10}
                            text='Delivery Date/ Slot'/>
                        <TextPage
                            style={styles.fontSize10}
                            text='Payment By:'/>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <ButtonPage
                            destination="/"
                            buttonText="Place Order" />
                    </View>
                </View>
            );
        }
  }

    const styles = StyleSheet.create({
        mainConatiner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        },
        editAddressBlock: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'lightgrey'
        },
        orderBlock: {
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        },
        block: {
        backgroundColor: '#FFFFFF',
        marginBottom: 10
        },
        waterCane: {
        height: 165,
        width: 85,
        margin: 10,
        },
        fontSize20: {
        fontSize: 20
        },
        fontSize10: {
        fontSize: 10
        },
        fontSize15: {
        fontSize: 15
        },
    });

    export default OrderPage;
