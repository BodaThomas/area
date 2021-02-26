import React, { useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import {Linking, View, Pressable, Text, StyleSheet, Image} from 'react-native'
import tailwind from 'tailwind-rn';
import Button from './Button.js'

export default function ServiceConnection(item) {
    return(
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <Pressable style={{backgroundColor: 'white', borderRadius: 30, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.item.primaryColor, borderWidth: 3}} onPress={() => Linking.openURL(item.item.OAuthUrl)}>
                <Image source={{uri: item.item.logo}} style={{width: 40, height: 40, resizeMode: 'contain', marginHorizontal: 10, backgroundColor: item.item.secondaryColor}}/>
                <View style={tailwind('flex-1 items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.item.name} </Text>
                </View>
            </Pressable>
        </View>
    )
}