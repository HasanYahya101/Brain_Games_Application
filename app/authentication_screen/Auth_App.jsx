//Auth_App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen_Auth from './auth_screens/home_screen';
import LoginScreen from './auth_screens/login_screen';
import SignupScreen from './auth_screens/signup_screen';
import CodeConfirmation from './auth_screens/code_confirmation';
import ForgotPass from './auth_screens/forgot_pass_screen';
import CodeConfirmationForgotPass from './auth_screens/code_confirmation_forgot_pass';
import Home_Screen from '../screens/home';
import { MainContainer } from '../MainContainer';

const Stack = createStackNavigator();

const Auth_App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen_Auth} options={{ headerShown: false }} />
                <Stack.Screen name="Login to an Account" component={LoginScreen} />
                <Stack.Screen name="Create a new Account" component={SignupScreen} />
                <Stack.Screen name="Code Confirmation" component={CodeConfirmation}
                    options={
                        {
                            headerShown: false,
                            gestureEnabled: true,
                        }
                    }
                />
                <Stack.Screen name="Forgot Password" component={ForgotPass} />
                <Stack.Screen name="Forgot Password Code Confirmation" component={CodeConfirmationForgotPass}
                    options={
                        {
                            headerShown: false,
                            gestureEnabled: true,
                        }
                    }
                />
                <Stack.Screen name="Home_Screen" component={Home_Screen}
                    options={
                        {
                            headerShown: false,
                            gestureEnabled: false
                        }
                    }
                />
                <Stack.Screen name="MainContainer" component={MainContainer} // navigate to MainContainer
                    options={
                        {
                            headerShown: false,
                            gestureEnabled: false
                        }
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Auth_App;