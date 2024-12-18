import React from 'react';
import { ScrollView, Text, Image, View, Pressable, Linking, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import { colors } from '../../../utils/colors';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types'; // Tipagem da navegação

const { height } = Dimensions.get('window');

// Definindo o tipo para os parâmetros da tela ProductDetails
type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetails = ({ route }: { route: ProductDetailsRouteProp }) => {
    const { product } = route?.params || {};

    const navigation = useNavigation();
    const onBackPress = () => {
        navigation.goBack();
    };

    const onContact = () => {
        // Realizando a chamada telefônica
        const phone = '127282827';
        Linking.openURL(`tel:${phone}`);

        // Enviando um e-mail
        const email = 'support@mail.com';
        Linking.openURL(`mailto:${email}`);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                {product?.images?.length ? (
                    <ImageCarousel images={product?.images} />
                ) : (
                    <Image style={styles.image} source={{ uri: product?.image }} />
                )}
                <View style={styles.content}>
                    <Text style={styles.title}>{product?.title}</Text>
                    <Text style={styles.price}>{product?.price}</Text>
                    <Text style={styles.description}>{product?.description}</Text>
                </View>

                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require('../../../assets/voltar.png')} />
                </Pressable>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.bookmarkContainer}>
                    <Image style={styles.bookmarkIcon} source={require('../../../assets/bookmark_blue.png')} />
                </Pressable>
                <Button  onPress={onContact} title="Contact Seller" />
            </View>
        </SafeAreaView>
    );
};

export default React.memo(ProductDetails);

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    footer: {
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        // Adicionando estilos adicionais caso necessário
    },
    image: {
        width: '100%',
        height: height * 0.45,
    },
    content: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -40,
        paddingHorizontal: 24,
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: '500',
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    description: {
        color: colors.textGrey,
        fontWeight: '300',
        marginVertical: 8,
    },
    bookmarkContainer: {
        backgroundColor: colors.lightGrey,
        padding: 18,
        borderRadius: 8,
        marginRight: 16,
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
    },
    backContainer: {
        backgroundColor: colors.white,
        padding: 10,
        margin: 24,
        borderRadius: 8,
        marginRight: 16,
        position: 'absolute',
    },
    backIcon: {
        width: 20,
        height: 20,
    },
});
