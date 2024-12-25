import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/app/Home";
import Favorites from "../screens/app/Favorites";

const stack = createNativeStackNavigator();

const AppRoutes = () => {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }} >
            <stack.Screen name="Home" component={Home} />
            <stack.Screen name="Favorites" component={Favorites} />
        </stack.Navigator>
    )
}

export default AppRoutes;