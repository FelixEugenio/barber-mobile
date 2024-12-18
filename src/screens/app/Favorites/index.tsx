import React from 'react';
import { FlatList, ScrollView, Text,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../../data/product';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';

type Props = {
    item: any
};
const Favorites = () => {
    const renderItem = ({item}: Props) => {
        return (
            <FavoriteItem {...item} />
        )
    }

    return (
        <SafeAreaView>
            <Header title="Favorites" />

            <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => String(item?.id)} />
        </SafeAreaView>
    )
}

export default React.memo(Favorites);



