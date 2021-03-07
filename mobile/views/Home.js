import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, Dimensions, View, Modal } from 'react-native'

import tailwind from 'tailwind-rn'
import API from '../Api.js';
import AddArea from '../components/AddArea.js';
import Area from '../components/Area.js';
import AddAreaPage from '../views/AddAreaPage.js'

export default function Home() {
    const [areaList, setAreaList] = useState([])
    const [addArea, setAddArea] = useState(false)

    async function getAreas() {
        await API.get(`/user/getAreas?accessToken=${global.accessToken}`)
        .then(res => res.data)
        .then(res => res.data)
        .then(res => {
            setAreaList(res)
        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {
        getAreas();
    }, [])
    useEffect(() => {
        getAreas();
    }, [addArea])
    console.log(areaList)
    return(
        <View>
            <AddAreaPage open={addArea} close={() => setAddArea(false)}/>
            <View style={{backgroundColor: '#F1F1F1'}}>
                <FlatList data={areaList} style={tailwind('pt-8 m-1')} renderItem={({item}) => <Area item={item}/>} keyExtractor={(item) => item.id.toString()} ListFooterComponent={() => <AddArea onClick={() => setAddArea(true)}/>}/>
            </View>
        </View>
    )
}