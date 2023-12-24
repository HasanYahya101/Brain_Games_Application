// notifications.js
import * as React from 'react';
import { Text, } from 'react-native';
// safe view
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Notifications_Screen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 25, lineHeight: 60, textAlign: 'center', marginLeft: 0, marginTop: 0, fontWeight: 'bold', color: '#ffffff', backgroundColor: '#000000' }}>
                Notifications
            </Text>
        </SafeAreaView>
    );
}
