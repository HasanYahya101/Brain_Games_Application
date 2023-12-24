// MainContainer.js
import * as React from 'react';
// importing navigation container and material bottom tab navigator
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import stack navigator
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// importing all screens
import Home_Screen from './screens/home';
import Performance_Screen from './screens/performance';
import Settings_Screen from './screens/settings';
import Percentages from './screens/percentages';
import Averages from './screens/averages';
import Conversions from './screens/conversion';
import Divisions from './screens/division';
import Details from './screens/details';
import Commas from './screens/commas';
import HomeScreen_Auth from './authentication_screen/auth_screens/home_screen';
// constant scrren names
const Home_Screen_Name = "Home";
const Performance_Screen_Name = "Performance";
const Settings_Screen_Name = "Settings";
const Notifications_Screen_Name = "Notifications";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeStackScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name={Home_Screen_Name}
                    component={MainContainer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Percentages'}
                    component={Percentages}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Averages'}
                    component={Averages}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Conversions'}
                    component={Conversions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Divisions'}
                    component={Divisions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Details'}
                    component={Details}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Commas'}
                    component={Commas}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Main Home'}
                    component={HomeScreen_Auth}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName={Home_Screen_Name}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === Home_Screen_Name)
                        iconName = focused ? 'home' : 'home-outline';
                    else if (rn === Performance_Screen_Name)
                        iconName = focused ? 'speedometer' : 'speedometer-outline';
                    else if (rn === Settings_Screen_Name)
                        iconName = focused ? 'settings' : 'settings-outline';
                    else if (rn === Notifications_Screen_Name)
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    return <Ionicons name={iconName} size={20} color={color} />;
                },
            })}

            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'black',
                labelStyle: { fontSize: 20 },
                style: { height: 0 }
            }}
        >
            <Tab.Screen name={Home_Screen_Name} component={Home_Screen} />
            <Tab.Screen name={Performance_Screen_Name} component={Performance_Screen} />
            <Tab.Screen name={Settings_Screen_Name} component={Settings_Screen} />
        </Tab.Navigator>
    );
}
//<Tab.Screen name={Notifications_Screen_Name} component={Notifications_Screen} /> // extra if needed