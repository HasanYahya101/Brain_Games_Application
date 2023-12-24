// login_screen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        let given_email_trimmed = email.trim();
        let given_password_trimmed = password.trim();

        if (given_email_trimmed === '') {
            Alert.alert('Error', 'Email cannot be empty');
            return;
        }
        else if (given_password_trimmed === '') {
            Alert.alert('Error', 'Password cannot be empty');
            return;
        }
        else if (!email || !password) {
            Alert.alert('Error', 'Please input all fields');
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(given_email_trimmed)) {
            Alert.alert('Error', 'Email is not valid');
            return;
        }
        else if (given_password_trimmed.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        // database is user.db, and table is UserProfiles with columns Names, Emails, Passwords
        const db = SQLite.openDatabase('user.db');
        if (!db) {
            Alert.alert('Error: Database not found', 'Login Failed');
            return;
        }

        // check if email and password exist and match
        const checkEmailPassword = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM UserProfiles WHERE Emails=? AND Passwords=?',
                    [given_email_trimmed, given_password_trimmed],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        });

        try {
            const emailPasswordMatch = await checkEmailPassword;

            if (!emailPasswordMatch) {
                Alert.alert('Error', 'User does not exist or password is incorrect');
                return;
            }
            else {
                console.log('Login successful');
            }
        }
        catch (error) {
            Alert.alert('Error', 'SQLite process failure');
            return;
        }

        // store email in async storage
        try {
            await AsyncStorage.setItem('email', given_email_trimmed);
        }
        catch (error) {
            Alert.alert('Error', 'AsyncStorage error');
            return;
        }

        // go to home screen
        navigation.navigate('MainContainer');
    };

    return (
        // turn the background white
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Ionicons name="people-outline"
                size={80}
                color="black"
                style={{ marginTop: 40 }}
            />
            <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginTop: 25 }}>Login</Text>
            <TextInput style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 40, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                placeholder="Email"
                placeholderTextColor="#000000"
                onChangeText={text => setEmail(text)}
            >
            </TextInput>
            <TextInput style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                placeholder="Password"
                placeholderTextColor="#000000"
                onChangeText={text => setPassword(text)}
            >
            </TextInput>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}
            >
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginTop: 12, color: '#000000', marginLeft: 190 }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}
                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 36, marginStart: 18 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                <View>
                    <Text style={{ width: 'auto', textAlign: 'center', marginLeft: 5, marginRight: 5 }}>Don't have an Account?</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginEnd: 18 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Create a new Account')}
                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', marginTop: 38 }}
            >
                <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Create Account</Text>
            </TouchableOpacity>

        </View>
    );
};

export default LoginScreen;