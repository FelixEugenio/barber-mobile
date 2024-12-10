import React from "react";
import { Text,Image, View ,TouchableOpacity, Pressable,StyleSheet} from "react-native";


type Props = {text: string};
const Separator = ({text}: Props) =>{
    return (
       <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line} />
       </View>
    )
}

export default Separator;

export const styles = StyleSheet.create({    
    container: {
        flexDirection:'row',
  alignItems:'center',
  marginVertical:20
    },
    text:{
        color:'#4F63AC',
  fontWeight:'500',
  marginHorizontal:8
    },
    line:{
        flex:1,
    backgroundColor:'#DADADA',
    height:1
    }
})