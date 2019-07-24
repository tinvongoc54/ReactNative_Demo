/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppStackNavigator from './components/AppStackNavigator';
import {name as appName} from './app.json';
import TodoList from './components/TodoList';

AppRegistry.registerComponent(appName, () => TodoList);
