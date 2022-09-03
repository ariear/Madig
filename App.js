import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather'
import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerContent from './src/custom/CustomDrawerContent';
import Profile from './src/screens/Profile';
import DetailContent from './src/screens/DetailContent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="DrawerNav" component={DrawerNav} />
        <Stack.Screen name="DetailContent" component={DetailContent} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
          headerShown: false,
          drawerActiveBackgroundColor: '#C1EFFF',
          drawerActiveTintColor: '#64A3EC' }}
      drawerContent={(props) => <CustomDrawerContent {...props} />
      }>
      <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            drawerIcon: ({color}) => (
              <Feather name="home" color={color} size={22} />
            )
           }}  />
      <Drawer.Screen 
          name="Profile" 
          component={Profile}
          options={{ 
            drawerIcon: ({color}) => (
              <Feather name="user" color={color} size={22} />
            )
           }} />
    </Drawer.Navigator>
  )
}

export default App