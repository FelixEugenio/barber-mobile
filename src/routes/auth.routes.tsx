import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import Splash from "../screens/auth/Splash";

const stack = createNativeStackNavigator();

const AuthRoutes = () => {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="Splash" component={Splash} />
            <stack.Screen name="SignIn" component={SignIn} />
            <stack.Screen name="SignUp" component={SignUp} />
        </stack.Navigator>
    )
}

export default AuthRoutes;
