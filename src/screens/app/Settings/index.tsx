import React, { useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View ,StyleSheet} from 'react-native';
import { colors } from '../../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import EditableBox from '../../../components/EditableBox';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { propStack } from '../../../utils';

type Props = {
    key: string;
    value: string;
}
const Settings = () => {
    const navigation = useNavigation<propStack>();
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({name: 'User', email: 'user@mail.com'})

    const onEditPress = () => {
        setEditing(true);
    }

    const onSave = () => {
        setEditing(false);
    }

    const onChange = ({key, value}: Props) => {
        setValues(v => ({...v, [key]: value}))
    }

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <Header showBack onBackPress={goBack} title="Settings" />
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('../../../assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox label="Name" onChangeText={(v) => onChange('name', v)} value={values.name} editable={editing} />
                <EditableBox label="Email" onChangeText={(v) => onChange('email', v)} value={values.email} editable={editing} />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title="Save" />
                ) : null}

                <Text style={[styles.sectionTitle, {marginTop: 40}]}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
                <ListItem onPress={onItemPress} style={styles.item} title="Contact Us" />
                <ListItem onPress={onItemPress} style={styles.item} title="Privacy & Terms" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);
export const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 8,
    },
    sectionTitle: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.grey,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 24,
        height: 24,
    },
    button: {
        paddingVertical: 12,
        marginTop: 16,
    }
})