import React, { useState } from "react";
import { colors } from "../../../utils/colors";
import { View,Text,StyleSheet} from "react-native";
import Button from "../../../components/Button";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { propStack } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

type Props = {
    navigation: any
}
export default function SignUp() {
    const navigation = useNavigation<propStack>();

    const onSignIn = () => {
        navigation.navigate('SignIn')
         }
    
    return (
        <View style={{marginTop:40}}>
            
             <AuthHeader title="Sign Up"/>
             <Input placeholder="Entre com o seu nome"  label="Name"  />
             <Input placeholder="Entre com o seu email"  label="Email"  />
             <Input placeholder="**********"  label="Password" isPassword />
             <Input placeholder="Entre com o seu telefone"  label="Phone"  />
             
             <View style={{marginHorizontal: 16, marginTop:20}}>
             <Button  title="Sign Up" />
             <Separator text="ou Cadastre-se com" />
             <GoogleLogin />
             <Text style={styles.footerText}>
            Voce Ja tem uma conta ?
            <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
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