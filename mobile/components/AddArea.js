import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { Pressable } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default function AddArea({onClick}) {
    return(
        <Pressable style={{height: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderColor: 'gray', borderRadius: 30, borderWidth: 3, margin: 5, flexDirection: 'column'}} onPress={() => onClick()}>
             <AntDesign name={'pluscircle'} size={64} color={'black'}/>
        </Pressable>
    )
}