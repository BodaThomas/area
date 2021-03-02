import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import {View} from 'react-native'

export default function Area({item}) {
    return(
        <View style={tailwind('bg-white rounded-3xl w-1/2 h-1/6')}>
        </View>
    )
}