// percentages.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
// ionicon
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
// library to play sound effects after loading from file using expo
import { Audio } from 'expo-av';
// import sqlite
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Commas = ({ navigation }) => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height + 50;
    const [isBlackBackground, setIsBlackBackground] = useState(true);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const [inputText, setInputText] = useState(""); // Add this to keep track of entered text
    const [Round, setRound] = useState(1); // Add this to keep track of entered text
    const [Correct, setCorrect] = useState(0);
    const [textField, settextField] = useState("The car sped down the highway the driver oblivious to the flashing lights behind him.");
    const [answer, setAnswer] = useState("highway");

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

    const [Email, setEmail] = useState('');

    const handleFinalContinue = async () => {
        let Percentage = (Correct / 4) * 100;
        // get email using async storage
        const getEmail = async () => {
            try {
                const value = await AsyncStorage.getItem('email')
                if (value !== null) {
                    setEmail(value);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getEmail();
        let GameName = 'Commas';
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
            // turn all to lowercase
            let correct_conversion = answer.toLowerCase();
            if (inputText === correct_conversion) {
                setCorrect(Correct + 1);
            }
            if (Round === 1) {
                let new_text = "The children played in the park their laughter echoing through the air.";
                settextField(new_text);
                let new_answer = "park";
                setAnswer(new_answer);
            }
            else if (Round === 2) {
                let new_text = "With a heavy heart she said goodbye knowing it might be their last farewell.";
                settextField(new_text);
                let new_answer = "heart";
                setAnswer(new_answer);
            }
            else if (Round === 3) {
                let new_text = "I have to go to the store to buy some groseries.";
                settextField(new_text);
                let new_answer = "store";
                setAnswer(new_answer);
            }
            else if (Round === 4) {
                let new_text = "I have to go to the store to buy some groseries.";
                settextField(new_text);
                let new_answer = "store";
                setAnswer(new_answer);
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
                <ImageBackground source={require('../../assets/imgs/game_back/game_commas_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                        >GAME FINISHED</Text>
                        <Image source={require('../../assets/imgs/tips/details/0.png')}
                            style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                        >
                        </Image>
                        <Text style={{ color: 'white', fontSize: 19, fontFamily: 'Dino-Light', marginTop: 40, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
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
                <ImageBackground source={require('../../assets/imgs/game_back/game_commas_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>
                    <Swiper
                        style={{ height: screenHeight }}
                        showsButtons={false}
                        showsPagination={true}
                        loop={false}
                        paginationStyle={{ bottom: 150 }}
                        dotColor={'#999999'}
                        activeDotColor={'#06baf3'}>

                        <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                            >INSTRUCTIONS</Text>
                            <Image source={require('../../assets/imgs/tips/details/0.png')}
                                style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                            >
                            </Image>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Dino-Light', marginTop: 40, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                            >Use the phone keyboard to enter alphabets into the given field.</Text>

                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.82)', height: screenHeight, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 29, fontFamily: 'Dino-Light', marginTop: 164 }}
                            >INSTRUCTIONS</Text>
                            <Image source={require('../../assets/imgs/tips/details/1.png')}
                                style={{ width: 320, height: 320, position: 'relative', alignSelf: 'center', marginTop: 28 }}
                            >
                            </Image>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Dino-Light', marginTop: 40, marginLeft: 40, marginRight: 40, textAlign: 'center' }}
                            >Click Submit Button to Sumbit your Answer.</Text>
                            <TouchableOpacity onPress={handleContinuePress}
                                style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#06baf3', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}
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
                <ImageBackground source={require('../../assets/imgs/game_back/game_commas_fullscreen.webp')} style={{ width: '100%', height: '100%' }}>
                    <TouchableOpacity onPressOut={() => Alert.alert('HINT', 'Check for Grammatical mistakes in the given text. Focus on Syntax')}
                    >
                        <Ionicons name="help-circle-outline" size={32} color="white" style={{ position: 'absolute', top: 66, left: 40, alignSelf: 'center' }}
                        >
                        </Ionicons>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Dino-Medium', position: 'absolute', justifyContent: 'center', top: 66, left: 280, alignSelf: 'center' }}
                    >ROUND {Round}/4</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Dino-Medium', position: 'absolute', justifyContent: 'center', top: 150, alignSelf: 'center', textAlign: 'center', marginLeft: 40, marginRight: 40 }}
                    >
                        Write the correct spellings of the word you believe is wrong.
                    </Text>
                    <Text style={{ color: 'white', fontSize: 32, fontFamily: 'Dino-Light', position: 'absolute', justifyContent: 'center', top: 240, alignSelf: 'center', textAlign: 'center', marginLeft: 40, marginRight: 40 }}
                    >{textField}</Text>
                    <TextInput style={{
                        width: 350, height: 60, borderRadius: 10, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: '#000000', borderWidth: 3, padding: 20, fontSize: 16, textAlign: 'center', marginLeft: 20, marginRight: 20, marginTop: 480
                    }}
                        placeholderTextColor="#000000"
                        placeholder="Enter your answer here"
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={() => handleKeyPress('submit')}
                    >
                    </TextInput>


                </ImageBackground>
            </View>
        );
    }
}

export default Commas;