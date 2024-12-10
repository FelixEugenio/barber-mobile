import React, { useState } from "react";
import { colors } from "../../../utils/colors";
import { View,Text,StyleSheet} from "react-native";
import Button from "../../../components/Button";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";

type Props = {
    navigation: any
}
export default function SignIn({navigation}: Props) {

    const onSignUp = () => {
        navigation.navigate('SignIn')
         }
    
    return (
        <View>
            
             <AuthHeader title="Sign In"/>
             
             <Input placeholder="Entre com o seu email"  label="Email"  />
             <Input placeholder="**********"  label="Password" isPassword />
             
             
             <View style={{marginHorizontal: 16, marginTop:20}}>
             <Button  title="Sign In" />
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