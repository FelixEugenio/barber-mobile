import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Text, ActivityIndicator, View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../contexts/AuthContext'; // Import AuthContext
import { api } from '../../../services/api';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

type Props = {
    item: any;
};

const MyAppointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);  // State to store appointments
    const [loading, setLoading] = useState<boolean>(true);  // Loading state
    const [error, setError] = useState<string | null>(null);  // Error state
    const { user } = useContext(AuthContext);  // Get user info from context

    const navigation = useNavigation();  // Navigation hook

    useEffect(() => {
        // Fetch user appointments on component mount
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                setError(null);  // Reset error state
                const response = await api.get('/appointments', {
                    headers: {
                        Authorization: `Bearer ${user.token}`  // Pass the token in the Authorization header
                    }
                });
                setAppointments(response.data);  // Store the fetched appointments
            } catch (err) {
                setError('Failed to fetch appointments');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user.token) {
            fetchAppointments();  // Fetch only if the token exists
        }
    }, [user.token]);  // Dependency array ensures this runs when the token changes

    const handleCancelAppointment = async (appointmentId: string) => {
        // Ask for confirmation before canceling the appointment
        Alert.alert(
            'Confirmar Cancelamento',
            'Tem certeza de que deseja cancelar o agendamento?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            await api.get(`/appointment/cancel/${appointmentId}`, {
                                headers: {
                                    Authorization: `Bearer ${user.token}`,  // Pass the token in the Authorization header
                                },
                            });
                            setAppointments(appointments.filter(item => item.id !== appointmentId));  // Remove the canceled appointment from the list
                            Alert.alert('Success', 'Teu agendamento foi cancelado com sucesso.');
                        } catch (err) {
                            Alert.alert('Error', 'Falha ao cancelar o agendamento.');
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: Props) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.professional.avatar }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.professional.name}</Text>
                    <Text style={styles.specialty}>{item.professional.specialty}</Text>
                    <Text style={styles.date}>
                        {new Date(item.scheduleAt).toLocaleString()} {/* Format date/time */}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelAppointment(item.id)}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView>
                <Header title="Meus Agendamentos" />
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
                <Header title="Meus Agendamentos" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Header title="Meus Agendamentos" />
            <FlatList
                data={appointments}
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
        marginVertical: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    textContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    specialty: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default React.memo(MyAppointments);
