import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import React from 'react'
import {Provider} from 'react-redux'
import {store,persistor} from '../redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import HomePage from '../page/HomePage'
import router from './router'
import TestPage from '../page/TestPage';



const MainNavigator = createStackNavigator(router);

export default createAppContainer(createSwitchNavigator(
    {
        Init: MainNavigator
    },
    {
        navigationOptions: {
            header: null
        }
    }
))
