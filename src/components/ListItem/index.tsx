import React from 'react';
import { Image, Pressable, Text, View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';

type Props = {
    title: string;
    subtitle?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>; // Melhor tipagem para o style
};

const ListItem = ({ title, subtitle, onPress, style }: Props) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text> {/* Certifique-se de que 'title' está dentro de um componente <Text> */}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>} {/* Certifique-se de que 'subtitle' também está dentro de <Text> */}
            </View>
            <Image style={styles.arrow} source={require('../../assets/arrow.png')} />
        </Pressable>
    );
};

export default React.memo(ListItem);

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
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
    textContainer: {
        flex: 1, // Garantir que o texto ocupe o máximo de espaço possível
    },
    title: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: colors.grey,
        marginTop: 6,
        fontSize: 12,
    },
    arrow: {
        width: 32,
        height: 32,
        tintColor: colors.blue, // Para garantir que a seta tenha a mesma cor do título
    },
});
