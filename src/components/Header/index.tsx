import React, { useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import Input from '../Input';
import { colors } from '../../utils/colors';
import { StyleSheet } from 'react-native';

type props = {
    title: string,
    onBackPress: () => void,
    onLogout: () => void,
    showLogout: boolean,
    showSearch: boolean,
    onSearch: (value: string) => void,
    keyword: string,
    showBack: boolean,
    onChangeText?: (value: string) => void
}

const Header = ({ title, onBackPress, onLogout, showLogout, showSearch, onSearch, keyword, showBack }: props) => {
    const [showSearchInput, setShowSearchInput] = useState(false);

    const onSearchClick = () => {
        setShowSearchInput(s => !s)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                {showBack ? (
                    <Pressable hitSlop={20} onPress={onBackPress}>
                        <Image style={styles.icon} source={require('../../assets/voltar.png')} />
                    </Pressable>
                ) : showSearch ? (
                    <Pressable hitSlop={20} onPress={onSearchClick}>
                        <Image style={styles.icon} source={require('../../assets/search.png')} />
                    </Pressable>
                ) : <View style={styles.space} />}

                <Text style={styles.title}>{title}</Text>

                {showLogout ? (
                    <Pressable hitSlop={20} onPress={onLogout}>
                        <Image style={styles.icon} source={require('../../assets/logout.png')} />
                    </Pressable>
                ) : <View style={styles.space} />}
            </View>

            {showSearchInput ? (
                <Input onChangeText={onSearch} value={keyword} placeholder="Type your keyword..." />
            ) : null}
        </View>
    )
}

export default React.memo(Header);

export const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 24,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    title: {
        color: colors.black,
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        width: 24,
        height: 24,
    },
    space: {
        width: 24,
    }
})