import React from "react";
import { Text,Pressable,TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
type Props = {
    title: string;
    onPress?: () => void
}

export default function Button({title,onPress}: Props) {
    return (
       <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
       </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
      container: {
        backgroundColor:colors.blue,
        paddingVertical:20,
        paddingHorizontal:8,
        borderRadius:8,
        width:'100%',
        marginVertical:15
      },
      text:{
        color:'white',
    textAlign:'center',
    fontSize:16,
    fontWeight:'bold'
      }
});