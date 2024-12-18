import React from "react"
import { View,TextInput ,StyleSheet,Text,Pressable,Image} from "react-native"
import { useState } from "react"
import { colors } from "../../utils/colors"

export type InputProps = {
    label?: string
    placeholder?: string
    isPassword?: boolean
    onChangeText?: (value: string) => void
    value?:string
}
 function Input({ label, placeholder, isPassword,onChangeText,value }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const onEyePress = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput secureTextEntry={isPassword && !isPasswordVisible} placeholder={placeholder} style={styles.input} />
                    
                    {isPassword ? (
                       <Pressable onPress={onEyePress}>
                       <Image style={styles.eye} source={isPasswordVisible ? require('../../assets/eye.png') : require('../../assets/eye_closed.png')} />
                       </Pressable>
                    ): null}
                    
            </View>
        </View>
    )
}

export default React.memo(Input);


export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop:20
        
    },
    label: {
        marginBottom: 8,
        color: colors.blue,
        fontSize: 14,
        fontWeight: '500'
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex: 1,
    },
    eye: {
        width: 24,
        height: 24,
        marginHorizontal: 16,
    }
})