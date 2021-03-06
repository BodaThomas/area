import React, { useState } from 'react';
import {View, Pressable, Text, Image} from 'react-native'
import { Feather } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';

import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session';

export default function ServiceConnection({item}) {
    const [connected, setConnected] = useState(false)
    async function connectOnClick() {
        const l_url = encodeURIComponent(AuthSession.getRedirectUrl({useProxy: false}))
        console.log('l_url: ', l_url)
        const toReplace = item.OAuthUrl.match(/(?:redirect_uri=)(.*?)(?=&|$)/)
        var url = item.OAuthUrl
        if (toReplace !== null)
            url = item.OAuthUrl.replace(toReplace[1], `${l_url}`)
        console.log('toReplace: ', toReplace)
        console.log('url: ', url)
        const result = await AuthSession.startAsync({authUrl: `${url}`})
        if (result.type === 'success')
            setConnected(true)
        console.log(result)
    }

    if (!connected) return(
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.primaryColor, borderWidth: 3, justifyContent: 'space-between'}}>
                <Image source={{uri: item.logo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.name} </Text>
                </View>
                <Pressable style={{backgroundColor: item.primaryColor, borderRadius: 4, padding: 4}} onPress={() => connectOnClick()}>
                    <Text style={tailwind('font-bold capitalize text-white')}> Connect </Text>
                </Pressable>
            </View>
        </View>
    )
    else return(
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.primaryColor, borderWidth: 3, justifyContent: 'space-between'}}>
                <Image source={{uri: item.logo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.name} </Text>
                </View>
                <Feather name="check-circle" size={40} color="black" />
            </View>
        </View>
    )
}