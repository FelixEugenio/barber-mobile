import React from "react";
import { View,Text,StatusBar,Image,StyleSheet, Pressable } from "react-native";
import Button from "../../../components/Button";
import { colors } from "../../../utils/colors";

export default function Splash() {
    return (
        <View style={styles.container}>
            
             <Image resizeMode="contain" style={styles.image} source={require('../../../assets/logo.png')} />
             <View style={styles.titleContainer}>
            <Text style={styles.title}>Barber App</Text><Text style={styles.innerTitle}>Faça já a sua </Text><Text style={styles.title}> Reserva agora</Text>
            </View>
             <Button title="Sign Up" />

             <Pressable hitSlop={20}>
                 <Text style={styles.footerText}>Sign In</Text>
             </Pressable>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
    
      padding: 24,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent:'center',
      height: '100%'
    },

    image:{
        width: 200,
        height: 200
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold', 
    },
    innerTitle:{
        fontSize:40,
        color: colors.orange,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    footerText: {
        color: colors.blue,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 30
    },
    titleContainer: {
        marginVertical:54,
        alignItems: 'center'
    }
  });