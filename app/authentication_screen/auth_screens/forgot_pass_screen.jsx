// forgot_pass_screen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as MailComposer from 'expo-mail-composer';
import * as SQLite from 'expo-sqlite';

const sendCodeByEmail = (email, code) => {
    MailComposer.composeAsync({
        recipients: [email],
        subject: 'Your verification code',
        body: `Your verification code is ${code}`,
    });
};

const ForgotPass = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let passtrim = password.trim();

    const handleSubmit = async () => {
        let emailtrim = email.trim();
        if (!email) {
            Alert.alert('Error', 'Please input all fields');
            return;
        }
        else if (emailtrim === '') {
            Alert.alert('Error', 'Email is not valid');
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailtrim)) {
            Alert.alert('Error', 'Email is not valid');
            return;
        }

        // if size of password is less hen 6
        if (passtrim.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        // the sqlite database is user.db and it has columns Names, Emails, Passwords in the table UserProfiles, check if email exists
        const db = SQLite.openDatabase('user.db');
        if (!db) {
            Alert.alert('Error: Database not found', 'Registration Failed');
            return;
        }
        const checkEmail = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM UserProfiles WHERE Emails = ?',
                    [emailtrim],
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
        }
        );
        const emailExists = await checkEmail;
        if (emailExists === false) {
            Alert.alert('Error', 'Email does not exist');
            return;
        }

        const user_data = {
            email: emailtrim,
            password: passtrim,
        };


        // generate a 4 digit random number
        const code = Math.floor(1000 + Math.random() * 9000);
        // convert to string
        const codeString = code.toString();
        // send email to user with code
        sendCodeByEmail(emailtrim, codeString);

        navigation.navigate('Forgot Password Code Confirmation', { user_data, codeString });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}
        >
            <Ionicons style={{ marginTop: 85 }}
                name="ios-lock-closed-outline" size={100} color="#000" />
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 20 }}>Enter Email</Text>
            <TextInput style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 40, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                placeholder="Email"
                placeholderTextColor="#000000"
                onChangeText={text => setEmail(text)}
            >
            </TextInput>
            <TextInput style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                placeholder="New Password"
                placeholderTextColor="#000000"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            >
            </TextInput>
            <TouchableOpacity onPress={handleSubmit}
                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Send Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login to an Account')}
                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ForgotPass;