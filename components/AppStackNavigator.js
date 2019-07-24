
import Login from './Login'
import Splash from './Splash'
import TodoList from './TodoList'
import {createStackNavigator, createAppContainer} from 'react-navigation'

const AppNavigator = createStackNavigator({
    Splash: { screen: Splash },
    Login: { screen: Login },
    Home: { screen: TodoList }
},
{
    //settings
    initialRouteName: 'Splash'
})

export default createAppContainer(AppNavigator)