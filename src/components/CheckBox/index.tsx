import React from "react";
import { Text,Image, View ,TouchableOpacity, Pressable,StyleSheet} from "react-native";
import { colors } from "../../utils/colors";

type Props = {
    checked: boolean,
    onCheck: (checked: boolean) => void
}

const CheckBox = ({checked,onCheck}: Props) =>{
    return (
       <TouchableOpacity activeOpacity={0.5} onPress={() => onCheck(!checked)} style={styles.container}>
        {checked ? (

            <View style={styles.innerContainer}>
            <Image  style={styles.checkIcon} source={require('../../assets/check.png')}/>
            </View>
             
        ) : null}
       </TouchableOpacity>
    )
}

export default CheckBox;

export const styles = StyleSheet.create({

    container:{
        borderColor:'grey',
         borderWidth:1,
          borderRadius:4,
          width:22,
          height:22
    },
    innerContainer:{
        backgroundColor:colors.grey,
  width:'100%',
  height:'100%',
  justifyContent:'center',
  alignItems:'center'
    },
    checkIcon:{
        width:12,
    height:9
    }
})