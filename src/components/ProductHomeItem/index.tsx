import React, { useState } from 'react';
import { Pressable, Text, View, Image,StyleSheet,Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');
type Props = {
    title?: string;
    price?: string;
    image?: string;
    onPress?: () => void
}
const ProductHomeItem = ({ title, price, image, onPress }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
        </Pressable>
    )
}

export default React.memo(ProductHomeItem);

export const  styles = StyleSheet.create({
    container: {
        margin: 8,
        
    },
    title: {
        color: colors.grey,
        paddingVertical: 8,
    },
    image: {
        width: (width - 64) / 2,
        height: 220,
        borderRadius: 8,
    },
    price: {
        color: colors.black,
        paddingBottom: 8,
    }
})