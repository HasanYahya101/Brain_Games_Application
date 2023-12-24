// percentages.js
import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
// ionicon
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
// library to play sound effects after loading from file using expo
import { Audio } from 'expo-av';
// import sqlite
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Percentages = ({ navigation }) => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height + 50;
    const [isBlackBackground, setIsBlackBackground] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const [inputText, setInputText] = useState(""); // Add this to keep track of entered text
    const [Round, setRound] = useState(1); // Add this to keep track of entered text
    const [Percent, setPercent] = useState(10);
    const [Number, setNumber] = useState(800);
    const [Correct, setCorrect] = useState(0);

    const handleContinuePress = () => {
        setIsBlackBackground(false);
        playNumberSpin();
    };

    // load audio files back space keytap.wav
    const [sound, setSound] = useState();

    async function playBack() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/audio/shared_keytap.wav')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    // load number_spin_loop.wav
    const [number_spin_loop, setnumber_spin_loop] = useState();

    async function playNumberSpin() {
        console.log('Loading Sound');
        const { sound: number_spin_loop } = await Audio.Sound.createAsync(
            require('../../assets/audio/number_spin_loop.wav')
        );
        setnumber_spin_loop(number_spin_loop);

        console.log('Playing Sound');
        await number_spin_loop.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    // load audio files back space keytap1
    const [keytap_1, setkey1] = useState();

    async function playKey1() {
        console.log('Loading Sound');
        const { sound: keytap_1 } = await Audio.Sound.createAsync(
            require('../../assets/audio/reward_line_1.wav')
        );
        setkey1(keytap_1);

        console.log('Playing Sound');
        await keytap_1.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    // now for keytap2
    const [keytap_2, setkey2] = useState();

    async function playKey2() {
        console.log('Loading Sound');
        const { sound: keytap_2 } = await Audio.Sound.createAsync(
            require('../../assets/audio/reward_line_2.wav')
        );
        setkey2(keytap_2);

        console.log('Playing Sound');
        await keytap_2.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    // now for keytap3
    const [keytap_3, setkey3] = useState();

    async function playKey3() {
        console.log('Loading Sound');
        const { sound: keytap_3 } = await Audio.Sound.createAsync(
            require('../../assets/audio/reward_line_3.wav')
        );
        setkey3(keytap_3);

        console.log('Playing Sound');
        await keytap_3.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    // for key 4 ie winning sound
    const [keytap_4, setkey4] = useState();

    async function playKey4() {
        console.log('Loading Sound');
        const { sound: keytap_4 } = await Audio.Sound.createAsync(
            require('../../assets/audio/game_win.wav')
        );
        setkey4(keytap_4);

        console.log('Playing Sound');
        await keytap_4.playAsync();

        // then remove from memory after playing

        return () => {
            sound.unloadAsync();
        }
    }

    const [Email, onChangeEmail] = React.useState('');



    const handleFinalContinue = async () => {
        let Percentage = (Correct / 4) * 100;

        // get email using async storage
        const getEmail = async () => {
            try {
                const value = await AsyncStorage.getItem('email')
                if (value !== null) {
                    onChangeEmail(value);
                    //saveToDatabase(value, Percentage);
                }
            } catch (e) {
                console.log(e);
            }
        }

        let GameName = 'Percentages';
        console.log('Saving to the database');
        const db = SQLite.openDatabase('user.db');
        // check if table GameData exists with columns Email, GameName, Percentage
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS GameData (Email TEXT, GameName TEXT, Percentage INTEGER);'
            );
        });
        // if table exists enter data
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO GameData (Email, GameName, Percentage) VALUES (?,?,?)',
                [Email, GameName, Percentage],
                (txObj, resultSet) => console.log('Inserted', resultSet.rowsAffected),
                (txObj, error) => console.log('Error', error)
            );
        });
        // navigate to home screen
        navigation.navigate('Home');
    };


    const handleKeyPress = (keyValue) => {
        // if total size s greater then 5
        if (inputText.length >= 5 && keyValue !== 'backspace' && keyValue !== 'submit') {
            return;
        }

        if (keyValue === 'backspace') {
            setInputText(prevInputText => prevInputText.slice(0, prevInputText.length - 1)); // Remove last character
            playBack();
        } else if (keyValue === 'submit') {
            let correct_percent = (Percent / 100) * Number;
            let correct_percent_rounded = Math.round(correct_percent);
            if (inputText == correct_percent_rounded) {
                setCorrect(Correct + 1);
            }
            // chenge value of percent and number
            if (Round === 1) {
                setPercent(20);
                setNumber(400);
            }
            else if (Round === 2) {
                setPercent(50);
                setNumber(200);
            }
            else if (Round === 3) {
                setPercent(75);
                setNumber(100);
            }
            else if (Round === 4) {
                setPercent(100);
                setNumber(100);
                setIsGameFinished(true);
            }
            // add ++ into round
            let newRound = Round;
            if (newRound !== 4) {
                setRound(Round + 1);
            }
            if (newRound === 1) {
                playKey1();
            }
            else if (newRound === 2) {
                playKey2();
            }
            else if (newRound === 3) {
                playKey3();
            }
            else if (newRound === 4) {
                playKey4();
            }

            // empty input text
            setInputText("");
        } else {
            setInputText(prevInputText => prevInputText + keyValue); // Append new key
            playBack();

        }
    };

    let [fontsLoaded] = useFonts({
        'RobotoBlack': require('../../assets/fonts/Roboto-Black.ttf'),
        'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'FontAwesome': require('../../assets/fonts/fontawesome-webfont.ttf'),
        'Dino-Light': require('../../assets/fonts/DINOT-Light.otf'),
        'Din-Light': require('../../assets/fonts/din_ot_light.otf'),
        'Dino-bold': require('../../assets/fonts/DINOT-Bold.otf'),
        'Dino-Medium': require('../../assets/fonts/DINOT-Medium.otf'),
        'Dino-Normal': require('../../assets/fonts/DINOT-Normal.otf'),
        'Tisa': require('../../assets/fonts/tisa_offc.ttf'),
        'Tisa-Italic': require('../../assets/fonts/tisa_offc_italic.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }
    if (isGameFinished) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ImageBackground source={require('../../assets/imgs/game_back/game_percentages_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                        >GAME FINISHED</Text>
                        <Image source={require('../../assets/imgs/tips/percentages/0.png')}
                            style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                        >
                        </Image>
                        <Text style={{ color: 'white', fontSize: 19, fontFamily: 'Dino-Light', marginTop: 20, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                        >Your Final Score is {Correct}/4.</Text>
                        <TouchableOpacity onPress={() => handleFinalContinue()}
                            style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#06baf3', justifyContent: 'center', alignItems: 'center', marginTop: 80 }}
                        >
                            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    if (isBlackBackground) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ImageBackground source={require('../../assets/imgs/game_back/game_percentages_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>
                    <Swiper
                        style={{ height: screenHeight }}
                        showsButtons={false}
                        showsPagination={true}
                        loop={false}
                        paginationStyle={{ bottom: 165 }}
                        dotColor={'#999999'}
                        activeDotColor={'#06baf3'}>

                        <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                            >INSTRUCTIONS</Text>
                            <Image source={require('../../assets/imgs/tips/percentages/0.png')}
                                style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                            >
                            </Image>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Dino-Light', marginTop: 20, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                            >Use the number pad to enter your answer to the prompt above.</Text>

                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                            >INSTRUCTIONS</Text>
                            <Image source={require('../../assets/imgs/tips/percentages/1.png')}
                                style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                            >
                            </Image>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Dino-Light', marginTop: 30, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                            >Tap submit when you have finished entering your answer.</Text>
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                            >INSTRUCTIONS</Text>
                            <Image source={require('../../assets/imgs/tips/percentages/2.png')}
                                style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                            >
                            </Image>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Dino-Light', marginTop: 15, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                            >Use your two previous answers from the set to help solve the final prompt.</Text>
                            <TouchableOpacity onPress={handleContinuePress}
                                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#06baf3', justifyContent: 'center', alignItems: 'center', marginTop: 115 }}
                            >
                                <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </Swiper>


                </ImageBackground>
            </View>
        );
    }
    else {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ImageBackground source={require('../../assets/imgs/game_back/game_percentages_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>
                    <TouchableOpacity onPressOut={() => Alert.alert('HINT', 'Percentage of a number is its value out of 100. For example, 50% of 100 is 50.')}
                    >
                        <Ionicons name="help-circle-outline" size={32} color="white" style={{ position: 'absolute', top: 66, left: 40, alignSelf: 'center' }}
                        >
                        </Ionicons>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Dino-Medium', position: 'absolute', justifyContent: 'center', top: 66, left: 280, alignSelf: 'center' }}
                    >ROUND {Round}/4</Text>
                    <Text style={{ color: 'white', fontSize: 48, fontFamily: 'Dino-Normal', position: 'absolute', justifyContent: 'center', top: 166, left: 70, alignSelf: 'center' }}
                    >{Percent}%</Text>
                    <Text style={{ color: 'white', fontSize: 48, fontFamily: 'Dino-Normal', position: 'absolute', justifyContent: 'center', top: 166, left: 240, alignSelf: 'center' }}
                    >{Number}</Text>
                    <Text style={{ color: 'white', fontSize: 36, fontFamily: 'Dino-Medium', position: 'absolute', justifyContent: 'center', top: 180, left: 178, alignSelf: 'center' }}
                    >OF</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Dino-Medium', position: 'absolute', justifyContent: 'center', top: 230, alignSelf: 'center' }}
                    >
                        Find percentage of the number
                    </Text>
                    <Text style={{ color: 'white', fontSize: 60, fontFamily: 'Dino-Light', position: 'absolute', justifyContent: 'center', top: 280, alignSelf: 'center' }}
                    >{inputText}</Text>

                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 25 }}
                    >
                        <TouchableOpacity onPressOut={() => handleKeyPress('1')}>
                            <View style={{ position: 'absolute', top: 380, left: 65, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('2')}>
                            <View style={{ position: 'absolute', top: 380, left: 165, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('3')}>
                            <View style={{ position: 'absolute', top: 380, left: 265, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >3</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 25 }}
                    >
                        <TouchableOpacity onPressOut={() => handleKeyPress('4')}>
                            <View style={{ position: 'absolute', top: 440, left: 65, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('5')}>
                            <View style={{ position: 'absolute', top: 440, left: 165, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('6')}>
                            <View style={{ position: 'absolute', top: 440, left: 265, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >6</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 25 }}
                    >
                        <TouchableOpacity onPressOut={() => handleKeyPress('7')}>
                            <View style={{ position: 'absolute', top: 500, left: 65, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >7</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('8')}>
                            <View style={{ position: 'absolute', top: 500, left: 165, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >8</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('9')}>
                            <View style={{ position: 'absolute', top: 500, left: 265, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >9</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 25 }}
                    >
                        <TouchableOpacity onPressOut={() => handleKeyPress('backspace')}>
                            <View style={{ position: 'absolute', top: 560, left: 65, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Ionicons name="ios-backspace" size={32} color="#feafcb" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('0')}>
                            <View style={{ position: 'absolute', top: 560, left: 165, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Text style={{ fontSize: 32, color: '#feafcb', fontFamily: 'Din-Light' }}
                                >0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => handleKeyPress('submit')}
                        >
                            <View style={{ position: 'absolute', top: 560, left: 265, alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: '#feafcb' }}>
                                <Ionicons name="ios-checkmark" size={32} color="#feafcb" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Percentages;