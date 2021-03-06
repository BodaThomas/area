import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import {View, Text} from 'react-native'

//bg-white flex-1 rounded-3xl h-16 m-2 border-4 border-gray-200 border-opacity-80 items-center justify-center

export default function Area({item}) {
    return(
        <View style={{height: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: 'gray', borderRadius: 30, borderWidth: 3, margin: 5}}>
            <Text> {item.id} </Text>
        </View>
    )
}