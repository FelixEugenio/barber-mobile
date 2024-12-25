import React, { useState,useContext } from "react";
import { colors } from "../../../utils/colors";
import { View,Text,StyleSheet} from "react-native";
import Button from "../../../components/Button";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { propStack } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SignIn() {
    const {signIn} = useContext(AuthContext);
    const navigation = useNavigation<propStack>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUp = () => {
        navigation.navigate('SignUp')
 }

         const onBack = () => navigation.goBack()

       async function handleLogin() {
            if(email === '' || password === '') {
                return;
            }

            await signIn({email,password});
          }
    
    return (
        <SafeAreaView>
             <View>
                
             <AuthHeader onBackPress={onBack} title="Sign In"/>
             
             <Input placeholder="Entre com o seu email" onChangeText={setEmail} value={email} label="Email"  />
             <Input placeholder="**********" onChangeText={(value: string) => setPassword(value)}  value={password} label="Password" isPassword />
             
             
             <View style={{marginHorizontal: 16, marginTop:20}}>
             <Button onPress={handleLogin}   title="Sign In" />
             <Separator text="ou Faça Login com" />
             <GoogleLogin />
             <Text style={styles.footerText}>
            Voce Ja tem uma conta ?
            <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
             </Text>
             </View>
        </View>
        </SafeAreaView>
        
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