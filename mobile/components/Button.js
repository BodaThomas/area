import { Text, Pressable, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'tailwind-rn'

export default function Button({text, onClick, style=null, activated=true}) {
    const addedStyle = (style == null ? ('') : (style))
    if (activated) return(
        <View style={tailwind(addedStyle)}>
            <Pressable style={tailwind('bg-blue-400 rounded-3xl p-2 items-center')} onPress={() => onClick()}>
                <Text style={tailwind('text-white')}> {text} </Text>
            </Pressable>
        </View>
    )
    else return (
        <View style={tailwind(addedStyle)}>
            <Pressable style={tailwind('bg-gray-400 rounded-3xl p-2 items-center')} onPress={() => onClick()}>
                <Text style={tailwind('text-white')}> {text} </Text>
            </Pressable>
        </View>

    )
}