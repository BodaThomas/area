import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn'

import LoginPage from './views/LoginPage.js'
import Home from './views/Home.js'

export default function App() {
  return (
    <View style={{flex: 1}}>
      <LoginPage />
      <StatusBar style="auto" />
    </View>
  );
}
