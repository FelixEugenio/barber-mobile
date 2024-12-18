import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { products } from '../../../data/product'; // Supondo que produtos sejam importados de algum arquivo
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { propStack } from '../../../utils';

// Definindo o tipo do produto, de acordo com a estrutura dos dados (ajuste conforme necessário)
interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
}

const MyListings = () => {
    const navigation = useNavigation<propStack>();

    // Função para renderizar o item na lista
    const renderItem = ({ item }: { item: Product }) => {
        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item });
        };

        return (
            <FavoriteItem icon={require('../../../assets/delete.png')} onPress={onProductPress} {...item} />
        );
    };

    // Função para voltar
    const goBack = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.container}>
            <Header title="My Listings" showBack onBackPress={goBack} />
            <FlatList
                data={products} 
                renderItem={renderItem} 
                keyExtractor={(item) => String(item.id)} 
                contentContainerStyle={styles.listContainer} // Estilo opcional para o conteúdo da lista
            />
        </SafeAreaView>
    );
};

export default React.memo(MyListings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Garantir o fundo branco no SafeAreaView
    },
    listContainer: {
        padding: 16, // Garantir que haja um espaçamento ao redor dos itens
    },
});
