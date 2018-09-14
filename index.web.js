import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {Route, Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import LoginPage from './src/components/LoginPage';
import VerifyAndRegisterUserPage from './src/components/VerifyAndRegisterUserPage';
import OrderPage from './src/components/OrderPage';
import DistributorReferralPage from './src/components/DistributorReferralPage';
import BulkOrderPage from './src/components/BulkOrderPage';

import history from './history';
import configureStore from './src/store/configureStore';
import SplitPane from 'react-split-pane';

import Content from './src/common/content.json';

const store = configureStore();

class TrolleyFresh extends Component {
    render() {
        return (
            <View style={styles.container}>

                <SplitPane split="vertical" defaultSize={400} minSize={50} primary="second">
                    <div style={{backgroundColor: '#FFFFFF'}}>

                    </div>
                    <div style={{
                        backgroundColor: '#40A248',
                        paddingTop: 100,
                        borderStyle: "outset",
                        borderColor: "#FFFFFF"
                    }}>
                        <Provider store={store}>
                            <Router history={history}>
                                <div>
                                    <Route exact path="/" component={LoginPage}/>
                                    <Route path={Content.verifyAndRegisterUserPath} component={VerifyAndRegisterUserPage}/>
                                    <Route path={Content.distributorReferralPath} component={DistributorReferralPage}/>
                                    <Route path={Content.orderPagePath} component={OrderPage}/>
                                    <Route path={Content.bulkOrderPagePath} component={BulkOrderPage}/>
                                </div>
                            </Router>
                        </Provider>
                    </div>
                </SplitPane>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 100,
        backgroundImage: "url(\"http://kensingtonsalonandspa.com/file/2017/07/waterglass.jpg\")",
        paddingRight: 200
    },
});


AppRegistry.registerComponent('TrolleyFresh', () => TrolleyFresh);
AppRegistry.runApplication('TrolleyFresh', {rootTag: document.getElementById('react-app')});
