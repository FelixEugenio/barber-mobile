import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { categories } from '../../../data/categories'; // Você pode manter as categorias se necessário para o filtro
import { useNavigation } from '@react-navigation/native';
import { propStack } from '../../../utils';
import CategoryBox from '../../../components/CategoryBox';
import { AuthContext } from '../../../contexts/AuthContext'; // Importando o contexto de autenticação
import { api } from '../../../services/api'; // Certifique-se de que o arquivo api está configurado

type Service = {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
};

const Home = () => {
    const navigation = useNavigation<propStack>(); // Tipagem da navegação
    const { user } = useContext(AuthContext); // Consumindo o usuário e o token do contexto

    // Estado de seleção de categoria e busca
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('');
    
    // Estado dos serviços filtrados
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Para controlar o carregamento
    const [error, setError] = useState<string | null>(null); // Para armazenar erros

    // Função para buscar os serviços da API
    const fetchServices = async () => {
        try {
            setIsLoading(true);
            setError(null); // Limpa o erro antes de fazer a nova requisição
            const response = await api.get('https://api-barber-backend.onrender.com/services', {
                headers: {
                    Authorization: `Bearer ${user.token}` // Usando o token do contexto
                }
            });
            const services = response.data;
            setFilteredServices(services); // Atualiza os serviços filtrados com os dados da API
        } catch (error) {
            console.error('Erro ao buscar os serviços', error);
            setError('Erro ao carregar os serviços. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    // Atualiza a lista de serviços quando a categoria ou o termo de busca muda
    useEffect(() => {
        fetchServices(); // Carrega os serviços da API ao montar o componente
    }, [user.token]);

    useEffect(() => {
        let updatedServices = filteredServices;

        // Filtrando por categoria (se aplicável)
        if (selectedCategory) {
            updatedServices = updatedServices.filter(service => service.id === selectedCategory);
        }

        // Filtrando por palavra-chave (se aplicável)
        if (keyword) {
            updatedServices = updatedServices.filter(service =>
                service.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        setFilteredServices(updatedServices);
    }, [selectedCategory, keyword]);

    // Função para renderizar a categoria (se você ainda precisar dela para o filtro)
    const renderCategoryItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <CategoryBox
                onPress={() => setSelectedCategory(item?.id)}
                isSelected={item?.id === selectedCategory}
                isFirst={index === 0}
                title={item?.title}
                image={item?.image}
            />
        );
    };

    // Função para renderizar cada item de serviço
    const renderServiceItem = ({ item }: { item: Service }) => {
        const onServicePress = (service: Service) => {
            navigation.navigate('Favorites', { service });
        };

        return (
            <TouchableOpacity style={styles.serviceItem} onPress={() => onServicePress(item)}>
                <Image source={{ uri: item.img }} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.servicePrice}>${item.price}</Text>
                    <Text style={styles.serviceDescription}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword} title="Procura oque Precisas" />

            {/* Renderizando categorias (opcional, se necessário) */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.list}
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => String(index)}
            />

            {/* Exibindo erro, se houver */}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {/* Renderizando a lista de serviços */}
            <FlatList
                style={styles.servicesList}
                numColumns={2} // Exibe os serviços em duas colunas
                data={filteredServices}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={
                    isLoading ? <Text>Carregando...</Text> : <View style={{ height: 200 }} />
                } // Exibe uma mensagem de carregamento enquanto espera a resposta
            />
        </SafeAreaView>
    );
};

export default React.memo(Home);

export const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    list: {
        paddingVertical: 24,
        marginTop: 16,
    },
    servicesList: {
        paddingHorizontal: 16,
    },
    serviceItem: {
        width: '45%',
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        marginHorizontal: 8,
        overflow: 'hidden',
    },
    serviceImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    serviceInfo: {
        marginTop: 12,
        alignItems: 'center',
    },
    serviceName: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    servicePrice: {
        marginTop: 4,
        fontSize: 16,
        color: '#4caf50',
        fontWeight: 'bold',
    },
    serviceDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    errorContainer: {
        backgroundColor: '#f8d7da',
        padding: 12,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    errorText: {
        color: '#721c24',
        fontWeight: 'bold',
    }
});
