import React from "react";
import { View,Text,StyleSheet, Pressable,Image } from "react-native";
import { colors } from "../../utils/colors";


type Props = {
    title: string
    onBackPress?: () => void

}
export default function AuthHeader({title,onBackPress}: Props) {
    return (
        <View style={styles.container}> 
            <Pressable hitSlop={20} onPress={onBackPress}>
                <Image  style={styles.image} source={require('../../assets/voltar.png')}/>
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       alignItems: 'center',
       margin: 16
    },
    title:{
        color:colors.blue,
        fontSize: 20,
        fontWeight:'500',
        paddingHorizontal: 10, 
    },
    image:{
        width: 18,
        height: 18
    }
});