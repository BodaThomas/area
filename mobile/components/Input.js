import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'tailwind-rn';

export default function Input({text, isPassword = false, getValue}) {
    return(
        <View style={tailwind('flex-col items-center')}>
            <View style={tailwind('bg-gray-100 rounded-3xl w-full p-2 px-4')}>
                <TextInput placeholder={text} secureTextEntry={isPassword} onChangeText={(value) => getValue(value)}/>
            </View>
        </View>
    )
}
