import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import Splash from './src/screens/auth/Splash';
import SignUp from './src/screens/auth/SignUp';
import SignIn from './src/screens/auth/SignIn';

export default function App() {
  return (
    <SafeAreaView>
        <SignIn />
    </SafeAreaView>
  );
}



