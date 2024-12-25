import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, ActivityIndicator, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../contexts/AuthContext'; // Import AuthContext
import { api } from '../../../services/api';
import Header from '../../../components/Header';

type Props = {
    item: any;
};

const Favorites = () => {
    const [professionals, setProfessionals] = useState<any[]>([]);  // State to store professionals
    const [loading, setLoading] = useState<boolean>(true);  // Loading state
    const [error, setError] = useState<string | null>(null);  // Error state

    const { user } = useContext(AuthContext);  // Get user info from context

    useEffect(() => {
        // Fetch professionals on component mount
        const fetchProfessionals = async () => {
            try {
                setLoading(true);
                setError(null);  // Reset error state
                const response = await api.get('/professionals', {
                    headers: {
                        Authorization: `Bearer ${user.token}`  // Pass the token in the Authorization header
                    }
                });
                setProfessionals(response.data);  // Store the fetched professionals
            } catch (err) {
                setError('Failed to fetch professionals');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user.token) {
            fetchProfessionals();  // Fetch only if the token exists
        }
    }, [user.token]);  // Dependency array ensures this runs when the token changes

    const renderItem = ({ item }: Props) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.specialty}>{item.specialty}</Text>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView>
                <Header title="Profissionais" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView>
                <Header title="Profissionais" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Header title="Profissionais" />
            <FlatList
                data={professionals}
                renderItem={renderItem}
                keyExtractor={(item) => String(item?.id)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    textContainer: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    specialty: {
        fontSize: 14,
        color: '#555',
    },
});

export default React.memo(Favorites);
