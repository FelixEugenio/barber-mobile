import React from 'react';
import { Image, Pressable, Text, TextInput, View,StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

type Props = {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    editable: boolean;
    style?: any
}
const EditableBox = ({ label, value, onChangeText, editable, style }: Props) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput editable={editable} value={value} onChangeText={onChangeText} style={styles.input} />
        </View>
    )
}

export default React.memo(EditableBox);

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: colors.white,
        marginVertical: 12,
        borderRadius: 4,
    },
    label: {
        color: colors.grey,
        fontSize: 12,
        marginBottom: 6,
    },
    input: {
        color: colors.blue,
        fontSize: 14,
        fontWeight: '500',
    }
})