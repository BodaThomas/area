import React, { useState } from 'react';
import { Modal, TouchableHighlight, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

import Button from './Button.js'

export default function ModalView({open, close, error}) {
    return (
        <View>
            <Modal visible={open} animationType='fade' transparent={true}>
                <View style={tailwind('flex-1 bg-black bg-opacity-50 z-0')}/>
            </Modal>
            <Modal visible={open} animationType='slide' transparent={true}>
                <View style={tailwind('flex-1 justify-center my-64 mx-16 z-10')}>
                    <View style={tailwind('flex-1 justify-evenly items-center bg-white rounded-3xl border-gray-300 border-4')}>
                        <Text style={tailwind('p-8 text-center')}>{error}</Text>
                        <Button text={'Close'} onClick={() => close()} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
