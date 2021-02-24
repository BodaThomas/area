import React, { useState } from 'react';
import { ImageBackground, View, Text, Pressable, Button, FlatList} from 'react-native'
import tailwind from 'tailwind-rn'
import API from '../Api.js';

import ModalView from '../components/Modal.js'
import ServiceConnection from '../components/ServiceConnection.js'

export default function Home() {
    const [error, setError] = useState('')
    const visible = (error !== '')
    const [list, setList] = useState([])
    getList()
    
    async function getList() {
        if (list.length == 0) {
            console.log('filling list')
            await API.get('/service/getServices')
            .then(res => res.data.Services)
            .then(json => {
                setList(json)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    console.log(list)
    return(
        <ImageBackground source={require('../assets/background.png')} style={tailwind('flex-1 justify-center')} imageStyle={tailwind('opacity-20')}>
            <ModalView open={visible} close={() => setError('')} error={error}/>
            <FlatList data={list} renderItem={ServiceConnection}/>
        </ImageBackground>
    )
}
