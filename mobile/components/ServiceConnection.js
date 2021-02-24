import React, { useState } from 'react';
import {Linking, View, Pressable, Text} from 'react-native'
import tailwind from 'tailwind-rn';
import Button from './Button.js'

export default function ServiceConnection(item) {
    console.log(item)
    console.log(item.item.name)
    return(
        <View style={tailwind('px-4')}>
            <Pressable style={tailwind('bg-blue-400 rounded-3xl flex-row p-8 items-center')} onPress={() => Linking.openURL(item.item.OAuthUrl)}>
                <Text> {item.item.name} </Text>
            </Pressable>
        </View>
    )
}