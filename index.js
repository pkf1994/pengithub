/**
 * @format
 */


//for using LayoutAnimation
import { UIManager } from 'react-native';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

import {AppRegistry} from 'react-native';
//import App from './App';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
