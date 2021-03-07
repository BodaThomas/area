import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import {View, Text, Image} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

//bg-white flex-1 rounded-3xl h-16 m-2 border-4 border-gray-200 border-opacity-80 items-center justify-center

export default function Area({item, remove}) {
    console.log(item)
    return(
        <View style={{height: 150, backgroundColor: 'white', borderBottomColor: item.reaction.service.pColor, borderLeftColor: item.action.service.pColor, borderRightColor: item.reaction.service.pColor, borderTopColor: item.action.service.pColor, borderRadius: 30, borderWidth: 3, margin: 5, padding: 10}}>
            <AntDesign name="closecircle" size={24} color="red" style={{position: 'absolute', right: 0, top: -5, backgroundColor: 'white', borderRadius: 40}} onPress={() => remove()}/>
            <View style={tailwind('flex-1 flex-row items-center')}>
                <Image source={{uri: item.action.service.urlLogo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('px-2')}>
                    <Text style={tailwind('text-base font-bold')}> {item.action.name} </Text>
                    <Text style={tailwind('text-sm font-bold')}> {item.action.description} </Text>
                </View>
            </View>
            <View style={tailwind('flex-1 flex-row-reverse items-center')}>
                <Image source={{uri: item.reaction.service.urlLogo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('items-end px-2')}>
                    <Text style={tailwind('text-base font-bold')}> {item.reaction.name} </Text>
                    <Text style={tailwind('text-sm font-bold')}> {item.reaction.description} </Text>
                </View>
            </View>
        </View>
    )
}