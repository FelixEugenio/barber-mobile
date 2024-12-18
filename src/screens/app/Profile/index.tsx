import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { propStack } from '../../../utils';

const Profile = () => {
    const navigation = useNavigation<propStack>();
    const num = 10; // Número de listagens, pode vir de uma API ou estado

    const onLogout = () => {
        console.log('Log out clicked');
        // Aqui você pode chamar a função de logout, limpar dados ou redirecionar.
    };

    const onSettingsPress = () => {
        navigation.navigate('Settings');
    };

    const onMyListingsPress = () => {
        navigation.navigate('MyListings');
    };

    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Profile" showLogout onLogout={onLogout} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.name}>User name</Text>
                    <Text style={styles.email}>User email</Text>

                    <ListItem
                        onPress={onMyListingsPress}
                        title="My Listings"
                        subtitle={`You have ${num} listings`}
                    />
                    <ListItem
                        onPress={onSettingsPress}
                        title="Settings"
                        subtitle="Account, FAQ, Contact"
                    />
                </View>

                <Button onPress={onNewListingPress} style={styles.addListingButton} title="Add New Listing" />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(Profile);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Garante que o SafeAreaView ocupe a tela inteira
    },
    container: {
        padding: 24,
        flex: 1, // Garante que o container ocupe o espaço disponível
    },
    content: {
        flex: 1, // Flex 1 para que o conteúdo ocupe o máximo possível
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 12,
    },
    email: {
        fontSize: 14,
        color: colors.grey,
        marginBottom: 16,
    },
    addListingButton: {
        marginTop: 16, // Um pequeno espaçamento para o botão
        flex: 0, // Para garantir que o botão tenha tamanho adequado
    }
});
