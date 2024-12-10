
import {SafeAreaView} from 'react-native';
import Splash from './src/screens/auth/Splash';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';
import Home from './src/screens/app/Home';
import Services from './src/screens/app/services';
import Professional from './src/screens/app/Professional';
import Profile from './src/screens/app/Profile';
import Appointments from './src/screens/app/Appointments';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const isSignedIn = true;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const Tabs = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={Home}/>
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Services" component={Services} />
    <Tab.Screen name="Professional" component={Professional} />
    <Tab.Screen name="Profile" component={Profile} />
    
  </Tab.Navigator>
  )
}
export default function App() {

  const theme = {
    colors: {
      background: colors.white
    }
  }
  
  return (
    
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isSignedIn ? (
            <><Stack.Screen name="Tabs" options={{headerShown: false}} component={Tabs} /></>
          ) : (
            <>
              <Stack.Screen name="Splash" options={{headerShown: false}} component={Splash} />
              <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
              <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
      
     
  );
}



