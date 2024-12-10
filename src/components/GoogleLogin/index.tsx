import React from "react";
import { Text,Image, View ,TouchableOpacity, Pressable,StyleSheet} from "react-native";

const GoogleLogin = () =>{
    return (
       <TouchableOpacity activeOpacity={0.5} style={styles.container}>
        <Image style={styles.image} source={require('../../assets/google.png')}/>
       </TouchableOpacity>
    )
}

export default React.memo(GoogleLogin);

export const styles = StyleSheet.create({    
    container: {
        backgroundColor:'#3F4A59',
        borderRadius:14,
        width:'40%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:16,
        marginBottom:30
    },
    image:{
        width:30,
  height:30
        
    }
})
