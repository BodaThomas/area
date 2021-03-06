import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { View, FlatList } from 'react-native'

import TopBar from '../components/TopBar.js'
import API from '../Api.js'
import Panel from '../components/Panel.js'

export default function ReactionPage() {
    const [reactions, setReactions] = useState([])
    getReactions()

    async function getReactions() {
        if (reactions.length === 0)
        await API.get(`/service/getReactions?accessToken=${global.accessToken}`)
        .then(res => res.data.data)
        .then(json => {
            var tmp = [];
            (json).forEach(element => {
                tmp.push(element);
            })
            setReactions(tmp)
        })
        .catch(error => {
            console.log(error)
        })
    }
    console.log('reactions: ', reactions)
    return(
        <View>
            <TopBar text={'Select a reaction'}/>
            <FlatList data={reactions} renderItem={({item}) => <Panel item={item}/>} keyExtractor={item => item.name} />
        </View>
    )
}