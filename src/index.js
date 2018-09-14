import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import LoginPage from './components/LoginPage';
import VerifyAndRegisterUserPage from './components/VerifyAndRegisterUserPage';
import DistributorReferralPage from './components/DistributorReferralPage';
import OrderPage from './components/OrderPage';
import BulkOrderPage from './components/BulkOrderPage';
import DrawyerContent from './common/DrawyerContent';
import Home from './components/Home';
import OrderHistory from './components/OrderHistory';

import configureStore from './store/configureStore';

const store = configureStore();

export default () => {

    Navigation.registerComponent('LoginPage', () => LoginPage, store, Provider);
    Navigation.registerComponent('VerifyAndRegisterUserPage', () => VerifyAndRegisterUserPage, store, Provider);
    Navigation.registerComponent('DistributorReferralPage', () => DistributorReferralPage, store, Provider);
    Navigation.registerComponent('OrderPage', () => OrderPage, store, Provider);
    Navigation.registerComponent('BulkOrderPage', () => BulkOrderPage, store, Provider);
    Navigation.registerComponent('DrawyerContent', () => DrawyerContent);
    Navigation.registerComponent('Home', () => Home);
    Navigation.registerComponent('OrderHistory', () => OrderHistory);

    Navigation.startSingleScreenApp({
        screen: {
            screen: 'LoginPage'
        },
        drawer: {
            left: {
                screen: 'DrawyerContent',
                passProps: {}
            },
            style: {
                drawerShadow: true,
                contentOverlayColor: 'rgba(0,0,0,0.25)',
                leftDrawerWidth: 70,
            },
            type: 'MMDrawer',
            animationType: 'door',
            disableOpenGesture: false
        },
        passProps: {},
        animationType: 'slide-down'
    });
};
