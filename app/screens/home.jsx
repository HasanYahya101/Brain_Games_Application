// home.js
import React, { useState } from 'react';
import { Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
// safe view
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Home_Screen({ navigation }) {

    let [fontsLoaded] = useFonts({
        'RobotoBlack': require('../../assets/fonts/Roboto-Black.ttf'),
        'RobotoRegular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'FontAwesome': require('../../assets/fonts/fontawesome-webfont.ttf'),
        'DINOT-Medium': require('../../assets/fonts/DINOT-Medium.otf'),
        'din_ot_medium': require('../../assets/fonts/din_ot_medium.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white' }}>

            <Text style={{ fontSize: 25, lineHeight: 60, textAlign: 'center', marginLeft: 0, marginTop: 0, fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                Home
            </Text>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                style={{ marginTop: 0 }}
            >
                <Text style={{ fontSize: 25, lineHeight: 60, marginLeft: 26, marginTop: 0, fontWeight: 'normal', color: '#000000', backgroundColor: '#ffffff', fontFamily: 'din_ot_medium' }}>
                    Math
                </Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    style={{ marginTop: 0 }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Conversions')}
                        style={{ marginLeft: 20, width: 176, height: 181 }}>
                        <Image
                            source={require('../../assets/imgs/game_conversion_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_conversion_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            CONVERSION
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 10, width: 176, height: 181 }}
                        onPress={() => navigation.navigate('Percentages')}
                    >
                        <Image
                            source={require('../../assets/imgs/game_percentages_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_percentages_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            PERCENTAGES
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Averages')}
                        style={{ marginLeft: 10, width: 176, height: 181 }}>
                        <Image
                            source={require('../../assets/imgs/game_averages_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_averages_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            AVERAGES
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Divisions')}
                        style={{ marginLeft: 10, width: 176, height: 181, marginRight: 20 }}>
                        <Image
                            source={require('../../assets/imgs/game_division_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_division_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            DIVISION
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <Text style={{ fontSize: 25, lineHeight: 60, marginLeft: 26, marginTop: 8, fontWeight: 'normal', color: '#000000', backgroundColor: '#ffffff', fontFamily: 'din_ot_medium' }}>
                    Grammer
                </Text>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    style={{ marginTop: 0 }}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Details')}
                        style={{ marginLeft: 20, width: 176, height: 181, marginRight: 10 }}>
                        <Image
                            source={require('../../assets/imgs/game_detail_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_detail_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            DETAIL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Commas')}
                        style={{ marginLeft: 0, width: 176, height: 181, marginRight: 20 }}>
                        <Image
                            source={require('../../assets/imgs/game_commas_square.webp')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                            resizeMode={'contain'}
                        />
                        <Image
                            source={require('../../assets/imgs/tip_game_commas_icon.webp')}
                            style={{ width: '40%', height: '80%', borderRadius: 10, position: 'absolute', alignSelf: 'center' }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ position: 'absolute', color: 'white', fontSize: 13, alignSelf: 'center', top: '70%', fontFamily: 'FontAwesome' }}>
                            COMMAS
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>

    );
}
