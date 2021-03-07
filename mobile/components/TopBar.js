import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { View, Text } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

import Button from './Button.js'
import API from '../Api.js'

export default function TopBar({close, text, activated, onClick}) {
    return(
        <View style={tailwind('flex-row bg-gray-200 h-16 px-4 items-center justify-between')}>
            <AntDesign name={'closecircle'} size={32} color={'red'} onPress={() => close()}/>
            <Text style={tailwind('text-xl font-bold')}> {text} </Text>
            <Button text={'Create Area'} activated={activated} onClick={onClick}></Button>
        </View>
    )
}