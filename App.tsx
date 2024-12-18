import { SafeAreaView, Image, StyleSheet } from 'react-native';
import Splash from './src/screens/auth/Splash';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';
import Home from './src/screens/app/Home';
import Services from './src/screens/app/services';
import Professional from './src/screens/app/Professional';
import Profile from './src/screens/app/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './src/screens/app/Favorites';
import React from 'react';

const isSignedIn = true;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;

          // Definindo o ícone de acordo com o nome da rota
          if (route.name === 'Home') {
            icon = focused
              ? require('./src/assets/tabs/home_active.png')
              : require('./src/assets/tabs/home.png');
          } else if (route.name === 'Profile') {
            icon = focused
              ? require('./src/assets/tabs/profile_active.png')
              : require('./src/assets/tabs/profile.png');
          } else if (route.name === 'Favoritos') {
            icon = focused
              ? require('./src/assets/tabs/bookmark_active.png')
              : require('./src/assets/tabs/bookmark.png');
          } 

          // Ajustando o tamanho do ícone com um valor fixo, como 30
          return <Image style={{ width: 30, height: 30 }} source={icon} />;
        },
        headerShown: false, // Esconde o cabeçalho
        tabBarShowLabel: false, // Não exibe o nome da aba
        tabBarStyle: { borderColor: colors.lightgrey }, // Estilo da barra de navegação
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favoritos" component={Favorites} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const theme = {
    colors: {
      background: colors.white, // Definindo a cor de fundo
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
          ) : (
            <>
              <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
              <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
              <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
