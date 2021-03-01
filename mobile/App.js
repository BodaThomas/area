import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn'

import LoginPage from './views/LoginPage.js'
import ConnectionsPage from './views/ConnectionsPage.js'

export default function App() {
    const [connected, setConnected] = useState(false)
  
    if (!connected) return (
        <View style={{flex: 1}}>
            <LoginPage setConnected={setConnected}/>
            <StatusBar style="auto" />
        </View>
    );
    else return (
        <View style={{flex: 1}}>
            <ConnectionsPage />
            <StatusBar style="auto" />
        </View>
  );
}
