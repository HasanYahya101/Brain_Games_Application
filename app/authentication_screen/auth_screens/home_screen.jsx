// home_screen.js
import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import { View, Image } from 'react-native';
import { useFonts } from 'expo-font';


const HomeScreen_Auth = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        'RobotoBlack': require('../../../assets/fonts/Roboto-Black.ttf'),
        'NovaSquare': require('../../../assets/fonts/NovaSquare-Regular.ttf'),
        //'SFProDisplayBlack': require('../../../assets/fonts/SF-Pro-Display-Black.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 126, fontWeight: 'bold', fontStyle: 'normal', fontFamily: 'NovaSquare' }}>Welcome</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 38 }}>
                <Image source={require('../../../assets/imgs/home.png')}
                    style={{ width: 415, height: 250, resizeMode: 'contain', left: -9 }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Create a new Account')}
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Create Account</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 36, marginStart: 18 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 'auto', textAlign: 'center', marginLeft: 5, marginRight: 5 }}>Already have an account?</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginEnd: 18 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login to an Account')}
                    style={{ width: 350, height: 60, borderRadius: 10, backgroundColor: '#FF6347', justifyContent: 'center', alignItems: 'center', marginTop: 38 }}
                >
                    <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: 'bold', justifyContent: 'center' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen_Auth;