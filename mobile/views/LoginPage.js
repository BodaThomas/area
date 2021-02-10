import tailwind from 'tailwind-rn'
import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';

import LoginForm from '../components/LoginForm.js'
import Modal from '../components/Modal.js'

export default function LoginPage() {
    const [modalVisible, setModalVisible] = useState(false)

    return(
        <View>
            <Modal />
            <ImageBackground source={require('../assets/background.png')} style={tailwind('opacity-20')}>
                <View style={tailwind('flex-col items-center h-full w-full')}>
                    <Text style={tailwind('text-4xl font-bold my-32')}>Area</Text>
                    <LoginForm />
                </View>
            </ImageBackground>
        </View>
    )
}
