import React from "react";
import { View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
    const isSignedIn = false;
    return (
        isSignedIn ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;