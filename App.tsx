
import {SafeAreaView} from 'react-native';
import Splash from './src/screens/auth/Splash';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';

const Stack = createNativeStackNavigator();
export default function App() {

  const theme = {
    colors: {
      background: colors.white
    }
  }
  
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" options={{headerShown: false}} component={Splash} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
          <Stack.Screen name="SignIn" options={{headerShown: false}} component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
     
  );
}



