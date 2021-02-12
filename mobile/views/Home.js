import React, { useState } from 'react';
import { ImageBackground, View, Text, Pressable} from 'react-native'
import tailwind from 'tailwind-rn'

import ModalView from '../components/Modal.js'

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false)

    return(
        <ImageBackground source={require('../assets/background.png')} style={tailwind('flex-1 justify-center items-center')} imageStyle={tailwind('opacity-20')}>
            <ModalView open={modalOpen} close={() => setModalOpen(false)}/>
            <Pressable style={tailwind('bg-blue-400 rounded-3xl p-2 items-center')} onPress={() => setModalOpen(true)}>
                <Text style={tailwind('text-white')}>Clique moi </Text>
            </Pressable>
        </ImageBackground>
        )
}
