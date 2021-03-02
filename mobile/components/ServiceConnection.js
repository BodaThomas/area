import React, { useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import {View, Pressable, Text, StyleSheet, Image} from 'react-native'
import tailwind from 'tailwind-rn';

import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

import Button from './Button.js'

export default function ServiceConnection(item) {
  
    async function connectOnClick() {
        const l_url = Linking.makeUrl()
        const url = item.item.OAuthUrl.replace(/(?:redirect_uri=)(.*?)(?:&|$)/g, `redirect_uri=${l_url}&`)
        const result = await WebBrowser.openAuthSessionAsync(url, l_url)
        if (result.type === 'success') {
            console.log("CA FONCTIONNE")
            
        }
        else {
            console.log("Error: can't connect to AuthPage.")
        }
    }

    return(
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <Pressable style={{backgroundColor: 'white', borderRadius: 30, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.item.primaryColor, borderWidth: 3}} onPress={() => connectOnClick()}>
                <Image source={{uri: item.item.logo}} style={{width: 40, height: 40, resizeMode: 'contain', marginHorizontal: 10, backgroundColor: item.item.secondaryColor}}/>
                <View style={tailwind('flex-1 items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.item.name} </Text>
                </View>
            </Pressable>
        </View>
    )
}