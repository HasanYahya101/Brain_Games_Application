// settings.js
import * as React from 'react';
import { Text, View } from 'react-native';
//touchable opacity
import { TouchableOpacity } from 'react-native-gesture-handler';
// safe view
import { SafeAreaView } from 'react-native-safe-area-context';
// Ionicons
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

export default function Settings_Screen({ navigation }) {

    const [email, onChangeEmail] = React.useState('');

    // get email using async storage
    const getEmail = async () => {
        try {
            const value = await AsyncStorage.getItem('email')
            if (value !== null) {
                onChangeEmail(value);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // open user.db to get name
    const db = SQLite.openDatabase('user.db');
    // in table UserProfiles there are columns Names, Emails, Passwords
    const getName = (email) => { // add email as parameter
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM UserProfiles WHERE Emails = ?',
                [email],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        onChangeName(results.rows.item(0).Names);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }

    React.useEffect(() => {
        getEmail();
    }, []);

    // function to handle pressing of logout button
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('email');
        } catch (e) {
            console.log(e);
        }
        // navigate to Main Home
        navigation.navigate('Main Home');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Text style={{ fontSize: 25, lineHeight: 60, textAlign: 'center', marginLeft: 0, marginTop: 0, fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                Settings
            </Text>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                <Ionicons name='person-circle-outline' size={180} color='#000000' />
                <View style={{ marginTop: 10, backgroundColor: '#f0f0f0', padding: 20, borderRadius: 10, width: '80%' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Personal Information</Text>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>Email: {email}</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>Project Information</Text>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>This project is for a Brain Training Application created for Human Computer Interaction Subject in 2023 Fall Semester in FAST NUCES Lhr.</Text>
                </View>
                <TouchableOpacity onPress={() => handleLogout()}
                    style={{ width: 300, height: 60, borderRadius: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Log out from Account</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
}
