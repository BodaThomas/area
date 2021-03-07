import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import tailwind from 'tailwind-rn';
import Button from '../components/Button.js'
import Input from '../components/Input.js'

export default function ParamsPage({visible, handleClick}) {
    const [actionParams, setActionParams] = useState([])
    const [reactionParams, setReactionParams] = useState([])
    const [actionParamsRes, setActionParamsRes] = useState('')
    const [reactionParamsRes, setReactionParamsRes] = useState('')

    
    function getActionsFromId() {
        let idx = 0;
        for (; idx !== actions.length; idx++) {
          if (actions[idx].id === selectedAct)
            return (idx)
        }
      }

    function getReactionsFromId() {
        let idx = 0;
        for (; idx !== reactions.length; idx++) {
            if (reactions[idx].id === selectedReact)
                return (idx)
        }
    }
    if (visible) {
        const tmpA = actions[getActionsFromId()].params.split(',')
    console.log('tmpA: ', tmpA)
    if (tmpA[0] != "")  {
        let idx = 0;
        let list = [];
        (tmpA).forEach(param => {
            const newObj = {
                name: param,
                id: idx
            };
            idx++;
            list.push(newObj);
        })
        setActionParams(list);
    }
    const tmpB = reactions[getReactionsFromId()].params.split(',')
    console.log('tmpB: ', tmpB)
    if (tmpB[0] !== "") {
        let idx = 0;
        let list = [];
        (tmpB).forEach(param => {
            const newObj = {
                name: param,
                id: idx
            };
            idx++;
            list.push(newObj);
        })
        console.log('list: ', list)
        setReactionParams(list);
    }
    console.log('actionParams: ', actionParams)
    console.log('reactionParams: ', reactionParams)
    if (actionParams.length === 0 && reactionParams.length === 0) {
      handleClick();
    }
    else
      setParams(true)
    }

    return (
        <View>
            <Modal visible={visible} animationType='fade' transparent={true}>
                <View style={tailwind('flex-1 bg-black bg-opacity-50 z-0')}/>
            </Modal>
            <Modal visible={visible} animationType='slide' transparent={true}>
                <View style={tailwind('flex-1 justify-center my-32 mx-8 z-10')}>
                  <View style={tailwind('flex-1 justify-evenly items-center bg-white rounded-3xl border-gray-300 border-4')}>
                    {actionParams === [] &&
                    <View>
                      <Text>Actions parameters: </Text>
                      <FlatList data={actionParams} renderItem={({item}) => <Input text={item} getValue={(val) => {actionParamsRes === '' ? setActionParamsRes(val) : setActionParamsRes(actionParamsRes + ',' + val)}} style={'py-2'} />} keyExtractor={item => item} />
                    </View>
                    }
                    {reactionParams === [] &&
                    <View>
                      <Text>Reaction parameters: </Text>
                      <FlatList data={reactionParams} renderItem={({item}) => <Input text={item} getValue={(val) => {reactionParamsRes === '' ? setReactionParamsRes(val) : setReactionParamsRes(reactionParamsRes + ',' + val)}} style={'py-2'} />} keyExtractor={item => item} />
                    </View>
                    }
                  </View>
                  <View style={tailwind('flex-col')}>
                      <Button text={'Create !'} onClick={() => {handleClick(); setParams(false)}} activated={true} style={'py-2'}/>
                      <Button text={'Cancel'} onClick={() => {setParams(false)}} activated={true} style={'pb-4'}/>
                  </View>
                </View>
            </Modal>
        </View>
    )
}