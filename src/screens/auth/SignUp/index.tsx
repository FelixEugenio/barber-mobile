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
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

type Props = {
    navigation: any
}
export default function SignUp() {
    const { signUp} = useContext(AuthContext);
    const navigation = useNavigation<propStack>();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');  
    const [password,setPassword] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');

    const onSignIn = () => {
        navigation.navigate('SignIn')
         }

         const onBack = () => {
            navigation.goBack()
         }

         async function handleSignUp(){
            if(name === '' || email === '' || password === '' || phoneNumber === '') {
                return;
            }


            await signUp({
                name,
                email,
                password,
                phoneNumber
            })
         }
    
    return (
        <SafeAreaView>
            <View>
             <AuthHeader onBackPress={onBack} title="Sign Up"/>
             <Input placeholder="Entre com o seu nome" onChangeText={setName} value={name} label="Name"  />
             <Input placeholder="Entre com o seu email" onChangeText={setEmail} value={email}  label="Email"  />
             <Input placeholder="**********"  label="Password" onChangeText={setPassword} value={password} isPassword />
             <Input placeholder="Entre com o seu telefone" onChangeText={setPhoneNumber} value={phoneNumber} label="Phone"  />
             
             <View style={{marginHorizontal: 16, marginTop:20}}>
             <Button  onPress={handleSignUp} title="Sign Up" />
             <Separator text="ou Cadastre-se com" />
             <GoogleLogin />
             <Text style={styles.footerText}>
            Voce Ja tem uma conta ?
            <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
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