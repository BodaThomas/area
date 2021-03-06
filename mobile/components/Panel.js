import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { Text, View, Image } from 'react-native'

export default function Panel({item}) {
    return (
        <View style={{flex: 1/2, flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, paddingVertical: 10, borderColor: item.service.pColor, borderWidth: 3}}>
            <View>
                <Image source={{uri: item.service.urlLogo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View>
                    <Text> {item.name} </Text>
                    <Text> {item.description} </Text>
                </View>
            </View>
        </View>
    )
}