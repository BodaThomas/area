import React, { useState } from 'react';
import { ImageBackground, View, Text, Pressable, Button, FlatList, Dimensions} from 'react-native'
import tailwind from 'tailwind-rn'
import API from '../Api.js';

import Modal from '../components/Modal.js'
import ServiceConnection from '../components/ServiceConnection.js'

export default function ConnectionsPage() {
    const [error, setError] = useState('')
    const visible = (error !== '')
    const [list, setList] = useState([])
    getList()
    
    async function getList() {
        if (list.length == 0) {
            console.log('filling list')
            await API.get('/service/getServices')
            .then(res => res.data.services)
            .then(json => {
                var tmp = [];
                var key = 0;
                (json).forEach(element => {
                    const newObj = {
                        key: key,
                        name: element.name,    
                        logo: element.logo,
                        primaryColor: element.primaryColor,
                        secondaryColor: element.secondaryColor,
                        OAuthUrl: element.OAuthUrl
                    };
                    key += 1
                    tmp.push(newObj)
                })
                console.log(tmp)
                setList(tmp)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    return(
        <ImageBackground source={require('../assets/background.png')} style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height+25}}>
            <Modal open={visible} close={() => setError('')} error={error}/>
            <FlatList data={list} style={tailwind('pt-8')} renderItem={ServiceConnection} keyExtractor={item => item.name}/>
        </ImageBackground>
    )
}
