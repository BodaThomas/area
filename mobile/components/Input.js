import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'tailwind-rn';

export default function Input({text, isPassword = false, getValue, style = null}) {
    const viewStyle = 'flex-col items-center'
    const addedStyle = (style == null ? ('') : (style))
    return(
        <View style={tailwind(viewStyle + ' ' + addedStyle)}>
            <View style={tailwind('bg-gray-100 rounded-3xl w-full p-2 px-4')}>
                <TextInput placeholder={text} secureTextEntry={isPassword} onChangeText={(value) => getValue(value)}/>
            </View>
        </View>
    )
}
