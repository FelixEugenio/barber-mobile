import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/AuthContext';
import { api } from '../../../services/api';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const Booking = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);  // Acessa o usuário logado
  const route = useRoute(); // Acessa os parâmetros passados pela navegação

  // Recebe os parâmetros passados pela tela de Favoritos
  const { professionalId, serviceId, userId } = route.params; 

  const [selectedDate, setSelectedDate] = useState<string>(''); // Armazena a data selecionada
  const [selectedTime, setSelectedTime] = useState<string>(''); // Armazena o horário selecionado
  const [availableTimes, setAvailableTimes] = useState<string[]>([]); // Horários disponíveis
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = moment().format('YYYY-MM-DD'); // Obtém a data de hoje

  // Lógica para carregar horários disponíveis
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      setAvailableTimes([
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
      ]);
      setIsLoading(false);
    }
  }, [selectedDate]);

  // Função para fazer o agendamento
  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Error', 'Você precisa estar logado para agendar um serviço.');
      navigation.navigate('SignIn');
      return;
    }

    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Por favor, selecione uma data e horário.');
      return;
    }

    const appointmentData = {
      userId: userId || user.id, // Usamos o userId passado ou o id do contexto
      professionalId: professionalId, // ID do profissional
      serviceId: serviceId, // ID do serviço
      scheduleAt: `${selectedDate}T${selectedTime}:00.000Z`, // Data e hora do agendamento
    };

    try {
      setIsLoading(true);
      const response = await api.post('https://api-barber-backend.onrender.com/appointments', appointmentData);
      setIsLoading(false);
      Alert.alert('Success', `Seu agendamento foi realizado para ${selectedDate} às ${selectedTime}.`);
      navigation.goBack(); // Volta para a tela anterior após o agendamento
    } catch (err) {
      setIsLoading(false);
      setError('Falha ao agendar o serviço.');
      console.error(err);
      Alert.alert('Error', 'Houve um erro ao tentar agendar seu serviço.');
    }
  };

  // Verifica se o horário já passou
  const isTimePassed = (time: string): boolean => {
    const timeMoment = moment(`${selectedDate} ${time}`, 'YYYY-MM-DD HH:mm');
    const currentMoment = moment();
    return timeMoment.isBefore(currentMoment, 'minute');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Agendamento" showSearch={false} />

      {/* Exibe o calendário */}
      <View style={styles.calendarContainer}>
        <Calendar
          minDate={currentDate} // Desabilita as datas anteriores a hoje
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' },
          }}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />
      </View>

      {/* Exibe os horários disponíveis */}
      <View style={styles.timeContainer}>
        {isLoading ? (
          <Text>Carregando horários disponíveis...</Text>
        ) : (
          <FlatList
            data={availableTimes}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTime(item);
                }}
                style={[
                  styles.timeSlot,
                  isTimePassed(item) ? styles.timeSlotDisabled : null, // Desabilita horários passados
                  item === selectedTime ? styles.timeSlotSelected : null, // Destaca o horário selecionado
                ]}
                disabled={isTimePassed(item)} // Desabilita a interação com horários passados
              >
                <Text style={styles.timeText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Botão de agendamento */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>

      {/* Exibe mensagem de erro, se houver */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  calendarContainer: {
    marginTop: 20,
  },
  timeContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  timeSlot: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotDisabled: {
    backgroundColor: '#e0e0e0',
  },
  timeSlotSelected: {
    backgroundColor: '#4caf50', // Cor de fundo para o horário selecionado
    borderColor: '#388e3c', // Cor da borda para o item selecionado
    borderWidth: 2, // Borda para destacar o horário
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#721c24',
    fontWeight: 'bold',
  },
});
