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
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para ícones de Material Design

type Service = {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
};

const Home = () => {
    const navigation = useNavigation<propStack>(); // Tipagem da navegação
    const { user,signOut } = useContext(AuthContext); // Consumindo o usuário e o token do contexto

    // Estado de seleção de categoria e busca
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('');
    
    // Estado dos serviços filtrados
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Para controlar o carregamento
    const [error, setError] = useState<string | null>(null); // Para armazenar erros
    const [numColumns, setNumColumns] = useState(2); // Estado para controlar o número de colunas dinamicamente

    async function handleLogout() {
        // Limpa o token do contexto
        await signOut();
    }
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
            console.log('ID do serviço selecionado:', service.id); // Verifique o ID no console
            // Passando apenas o id do serviço
            navigation.navigate('Favorites', { serviceId: service.id });
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

    // Função para navegar para a tela de "Meus Agendamentos"
    const goToMyAppointments = () => {
        navigation.navigate('MyAppointments'); // Navega para a tela de Meus Agendamentos
    };

    // Função para navegar para a tela de Profile
    const goToProfile = () => {
        navigation.navigate('Profile'); // Navega para a tela de Perfil
    };

    return (
        <SafeAreaView>
            <Header 
              onLogout={handleLogout}
                showLogout 
                keyword={keyword} 
                title="Procura oque Precisas" 
            />

            {/* Barra superior com botões de navegação */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.iconButton} onPress={goToProfile}>
                    <MaterialCommunityIcons name="account" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={goToMyAppointments}>
                    <MaterialCommunityIcons name="calendar" size={24} color="white" />
                </TouchableOpacity>
            </View>

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
                numColumns={numColumns} // Usando o número de colunas dinâmico
                data={filteredServices}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.id}
                key={`numColumns-${numColumns}`} // Força a atualização do layout com base no número de colunas
                ListFooterComponent={
                    isLoading ? <Text>Carregando...</Text> : <View style={{ height: 200 }} />
                }
            />
        </SafeAreaView>
    );
};

export default React.memo(Home);

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#4CAF50', // Cor de fundo conforme a cor principal do seu app
    },
    iconButton: {
        marginHorizontal: 8,
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
    },
});
