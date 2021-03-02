import tailwind from 'tailwind-rn'
import React, { useState } from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';

import LoginForm from '../components/LoginForm.js'
import Modal from '../components/Modal.js'
import Button from '../components/Button.js'

export default function LoginPage({setConnected}) {
    const [error, setError] = useState('')
    const visible = (error !== '')

    return(
        <ImageBackground source={require('../assets/background.png')} style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height+25}}>
            <Modal open={visible} close={() => setError('')} error={error}/>
            <View style={tailwind('flex-col items-center h-full w-full')}>
                <Text style={tailwind('text-4xl font-bold my-32')}>Area</Text>
                <LoginForm setError={setError} setConnected={setConnected}/>
            </View>
        </ImageBackground>
    )
}
