// code_confirmation_forgot_pass.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

const CodeConfirmationForgotPass = ({ navigation, route }) => {
    const { user_data, codeString } = route.params;
    // first code
    const [code1, setCode1] = useState('');
    // second code
    const [code2, setCode2] = useState('');
    // third code
    const [code3, setCode3] = useState('');
    // fourth code
    const [code4, setCode4] = useState('');

    const email = user_data.email;
    const newpass = user_data.password;

    const checkCode = async () => {
        const userenteredcode = code1 + code2 + code3 + code4;

        let flag = false;
        if (userenteredcode === codeString) {
            flag = true;
        }
        else {
            flag = false;
        }

        if (flag === false) {
            Alert.alert('Error', 'Incorrect Code');
            return;
        }

        // open database
        const db = SQLite.openDatabase('user.db');

        if (!db) {
            Alert.alert('Error: Database not found', 'Registration Failed');
            return;
        }

        const createTable = new Promise((resolve, reject) => {
            // check if UserProfiles table exists
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT name FROM sqlite_master WHERE type="table" AND name="UserProfiles"',
                    [],
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

        const tableExists = await createTable;

        if (!tableExists) {
            Alert.alert('Error: Database not found', 'Registration Failed');
            return;
        }

        const checkEmail = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM UserProfiles WHERE Emails = ?',
                    [email],
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

        if (!emailExists) {
            Alert.alert('Error', 'Email does not exist');
            return;
        }

        // update the password
        const updatePassword = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE UserProfiles SET Passwords = ? WHERE Emails = ?',
                    [newpass, email],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
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

        const passwordUpdated = await updatePassword;

        if (!passwordUpdated) {
            Alert.alert('Error', 'Password not updated');
            return;
        }

        Alert.alert('Success', 'Password updated successfully, Redirecting to Login Screen',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login to an Account')
                }
            ]
        );
    }

    return (
        <View
            style={{ backgroundColor: '#ffffff', flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0 }}
        >
            <Ionicons
                name='lock-closed-outline'
                color='#000000'
                size={50}
                style={{ marginTop: 170 }}
            />

            <Text style={{ fontSize: 34, textAlign: 'center', marginTop: 45, fontWeight: 'normal', fontStyle: 'normal', fontFamily: 'NovaSquare' }}>Enter 4 Digit Code</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 170, marginTop: 58, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={{ height: 60, width: 60, borderColor: '#000000', borderWidth: 3, textAlign: 'center', borderRadius: 10, marginLeft: 5, marginRight: 5, fontSize: 22, fontWeight: 'bold' }}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={text => setCode1(text)}
                    />
                    <TextInput
                        style={{ height: 60, width: 60, borderColor: '#000000', borderWidth: 3, textAlign: 'center', borderRadius: 10, marginLeft: 5, marginRight: 5, fontSize: 22, fontWeight: 'bold' }}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={text => setCode2(text)}
                    />
                    <TextInput
                        style={{ height: 60, width: 60, borderColor: '#000000', borderWidth: 3, textAlign: 'center', borderRadius: 10, marginLeft: 5, marginRight: 5, fontSize: 22, fontWeight: 'bold' }}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={text => setCode3(text)}
                    />
                    <TextInput
                        style={{ height: 60, width: 60, borderColor: '#000000', borderWidth: 3, textAlign: 'center', borderRadius: 10, marginLeft: 5, marginRight: 5, fontSize: 22, fontWeight: 'bold' }}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={text => setCode4(text)}
                    />
                </View>
                <TouchableOpacity
                    style={{ marginTop: 80, marginBottom: 30, backgroundColor: '#000000', width: 350, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => checkCode()}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'normal', fontFamily: 'normal', color: '#ffffff' }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 0, marginBottom: 30, backgroundColor: '#FF6347', width: 350, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'normal', fontFamily: 'normal', color: '#ffffff' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );



};

export default CodeConfirmationForgotPass;