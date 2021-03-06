import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginPage from './views/LoginPage.js'
import Home from './views/Home.js'
import ConnectionsPage from './views/ConnectionsPage.js'

import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

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
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                            tabBarIcon: ({color, size}) => {
                                let iconName;
                                switch (route.name) {
                                    case 'Home': iconName = 'home'; break;
                                    case 'Accounts': iconName = 'team'; break;
                                }
                                return <AntDesign name={iconName} size={size} color={color}/>;
                            },
                            })}
                            tabBarOptions={{
                            activeTintColor: 'black',
                            inactiveTintColor: '#9e9e9e'
                            }}>
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Accounts" component={ConnectionsPage}/>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </View>
  );
}
