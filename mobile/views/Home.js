import React, { useState } from 'react';
import { FlatList, ImageBackground, Dimensions } from 'react-native'

import tailwind from 'tailwind-rn'
import addArea from '../components/AddArea.js';
import Area from '../components/Area.js';

export default function Home() {
    const [areaList, setAreaList] = useState([
        {id: 1},
    ])
    return(
        <ImageBackground source={require('../assets/background.png')} style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height+25}}>
            <FlatList data={areaList} style={tailwind('pt-8')} renderItem={Area} keyExtractor={(item) => item.id} ListFooterComponent={addArea} numColumns={2}/>
        </ImageBackground>
    )
}