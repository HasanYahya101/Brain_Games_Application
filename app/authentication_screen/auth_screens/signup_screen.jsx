// signup_screen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

const sendCodeByEmail = (email, code) => {
    MailComposer.composeAsync({
        recipients: [email],
        subject: 'Your verification code',
        body: `Your verification code is ${code}`,
    });
};

const SignupScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please input all fields');
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            Alert.alert('Error', 'Email is not valid');
            return;
        }
        else if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        else if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }
        // removing all spaces at end of name, email and password
        const fullNameTrimmed = fullName.trim();
        const emailTrimmed = email.trim();
        const passwordTrimmed = password.trim();
        // loading user data into user_data object
        const user_data = {
            fullName: fullNameTrimmed,
            email: emailTrimmed,
            password: passwordTrimmed,
        };
        // generate a 4 digit random number
        const code = Math.floor(1000 + Math.random() * 9000);
        // convert to string
        const codeString = code.toString();
        // send email to user with code
        sendCodeByEmail(emailTrimmed, codeString);
        // got to code confirmation screen
        navigation.navigate('Code Confirmation', { user_data, codeString });

    };
    return (
        <View
            style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}
        >
            <Text style={{ fontSize: 34, textAlign: 'center', marginTop: 30, fontWeight: 'bold', fontStyle: 'normal', fontFamily: 'normal' }}>Sign Up</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0 }}>
                <TextInput
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 38, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                    placeholder="Full Name"
                    placeholderTextColor="#000000"
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                />
                <TextInput
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                    placeholder="Email"
                    placeholderTextColor="#000000"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                    placeholder="Password"
                    placeholderTextColor="#000000"
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TextInput
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginTop: 20, borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16 }}
                    placeholder="Confirm Password"
                    placeholderTextColor="#000000"
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                />
                <TouchableOpacity onPress={handleSubmit}
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginTop: 35, marginBottom: 20 }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Sign Up</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 36, marginStart: 18 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 'auto', textAlign: 'center', marginLeft: 5, marginRight: 5 }}>Already have an account?</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginEnd: 18 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login to an Account')}
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Login to an Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupScreen;