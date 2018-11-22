import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';

export default createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
);
