import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { View, FlatList } from 'react-native'

import TopBar from '../components/TopBar.js'
import API from '../Api.js'
import Panel from '../components/Panel.js'

export default function ActionPage({close}) {
    const [actions, setActions] = useState([])
    getActions()

    async function getActions() {
        if (actions.length === 0)
        await API.get(`/service/getActions?accessToken=${global.accessToken}`)
        .then(res => res.data.data)
        .then(json => {
            var tmp = [];
            (json).forEach(element => {
                tmp.push(element);
            })
            setActions(tmp)
        })
        .catch(error => {
            console.log(error)
        })
    }
    console.log('actions: ', actions)
    return(
        <View>
            <TopBar text={'Select an action'} close={() => close()}/>
            <FlatList style={tailwind('mb-16 px-2')} data={actions} renderItem={({item}) => <Panel item={item}/>} keyExtractor={item => item.name} />
        </View>
    )
}