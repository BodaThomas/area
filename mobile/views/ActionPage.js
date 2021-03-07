import React, { useState } from 'react';
import tailwind from 'tailwind-rn'
import { View, FlatList } from 'react-native'

import TopBar from '../components/TopBar.js'
import Panel from '../components/Panel.js'

export default function ActionPage({actions, close, selected, setSelected, act, onClick}) {
    return(
        <View>
            <TopBar text={'Select an action'} close={() => close()} activated={act} onClick={onClick}/>
            <FlatList style={tailwind('mb-16 px-2')} data={actions} renderItem={({item}) => <Panel item={item} onClick={() => setSelected(item.id)} selected={(selected === item.id ? true : false)}/>} keyExtractor={item => item.name} />
        </View>
    )
}