import React, { useState } from "react";
import { colors } from "../../../utils/colors";
import { View,Text,StyleSheet} from "react-native";
import Button from "../../../components/Button";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { PropsWithChildren } from "react";
import { propStack } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
    const navigation = useNavigation<propStack>();

    const onSignUp = () => {
        navigation.navigate('SignUp')
         }
    
    return (
        <View style={{marginTop:40}}>
            
             <AuthHeader title="Sign In"/>
             
             <Input placeholder="Entre com o seu email"  label="Email"  />
             <Input placeholder="**********"  label="Password" isPassword />
             
             
             <View style={{marginHorizontal: 16, marginTop:20}}>
             <Button   title="Sign In" />
             <Separator text="ou Faça Login com" />
             <GoogleLogin />
             <Text style={styles.footerText}>
            Voce Ja tem uma conta ?
            <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
             </Text>
             </View>
            

        </View>
    );
}

export const styles = StyleSheet.create({    
    footerText: {
        color: colors.grey,
        textAlign:'center',
        marginTop:20
    },
    footerLink: {
        color: colors.blue,
        fontWeight:'bold'
    }
})