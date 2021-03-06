import React, { useState } from 'react';
import { FlatList, ImageBackground, Dimensions, View, Modal } from 'react-native'

import tailwind from 'tailwind-rn'
import AddArea from '../components/AddArea.js';
import Area from '../components/Area.js';
import AddAreaPage from '../views/AddAreaPage.js'

export default function Home() {
    const [areaList, setAreaList] = useState([])
    const [addArea, setAddArea] = useState(false)

    console.log(addArea)
    return(
        <View>
            <AddAreaPage open={addArea} close={() => setAddArea(false)}/>
            <View style={{backgroundColor: '#F1F1F1'}}>
                <FlatList data={areaList} style={tailwind('pt-8 m-1')} renderItem={Area} keyExtractor={(item) => item.id.toString()} ListFooterComponent={() => <AddArea onClick={() => setAddArea(true)}/>}/>
            </View>
        </View>
    )
}