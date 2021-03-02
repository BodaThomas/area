import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { View, Text } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default function AddArea() {
    return(
        <View style={tailwind('bg-white rounded-3xl w-1/2 py-8 border-4 border-gray-200 border-opacity-80 flex-1 items-center justify-center')}>
             <AntDesign name={'pluscircle'} size={64} color={'black'}/>
        </View>
    )
}