import React ,{ useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {

    const { isSignedIn } = useContext(AuthContext);
    return (
        isSignedIn ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;