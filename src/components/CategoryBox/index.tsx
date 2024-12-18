import React from 'react';
import { Pressable, Text, View, Image,StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

type Props = {
    title?: string;
    image?: string;
    onPress?: () => void;
    isFirst?: boolean;
    isSelected?: boolean;
}
const CategoryBox = ({ title, image, onPress, isFirst, isSelected }: Props) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, isFirst ? { marginLeft: 24 } : {}]}>
            <View style={[styles.imageContainer, isSelected ? { backgroundColor: colors.black } : {}]}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <Text style={[styles.title, isSelected ? { color: colors.blue, fontWeight: '500' } : {}]}>{title}</Text>
        </Pressable>
    )
}

export default React.memo(CategoryBox);

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.grey,
    },
    image: {
        width: 32,
        height: 32,
    },
    imageContainer: {
        backgroundColor: colors.lightgrey,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    }
})