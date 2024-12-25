import { SafeAreaView, Image, StyleSheet } from 'react-native';
import Splash from './src/screens/auth/Splash';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';
import Home from './src/screens/app/Home';
import Services from './src/screens/app/services';
import Professional from './src/screens/app/Professional';
import Appointments from './src/screens/app/Appointments';
import MyListings from './src/screens/app/MyListings';
import Settings from './src/screens/app/Settings';
import CreateListing from './src/screens/app/CreateListing';
import ProductDetails from './src/screens/app/ProductDetails';
import Profile from './src/screens/app/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './src/screens/app/Favorites';
import React from 'react';
import ListItem from './src/components/ListItem';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
        <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
