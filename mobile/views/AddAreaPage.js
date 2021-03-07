import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import tailwind from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ActionPage from './ActionPage.js'
import ReactionPage from './ReactionPage.js'
import API from '../Api.js'

import { AntDesign } from '@expo/vector-icons';
import ParamsPage from './ParamsPage.js';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
  
    return (
    <View style={{ flexDirection: 'row', height: 50}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
              key={index}
            >
              <Text style={{ color: isFocused ? '#673ab7' : '#222', fontSize: 18}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
}

export default function AddAreaPage({open, close}) {
    const [selectedAct, setSelectedAct] = useState(null)
    const [selectedReact, setSelectedReact] = useState(null)
    const [reactions, setReactions] = useState([])
    const [actions, setActions] = useState([])
    const [showParams, setShowParams] = useState(false)
    const act = (selectedAct !== null && selectedReact !== null ? true : false)

    //useEffect(() => {
      getReactions();
      getActions();
  //}, [])


    
    async function getReactions() {
      if (reactions.length !== 0) return
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
    
    async function getActions() {
      if (actions.length !== 0) return
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

    async function handleClick() {
        let body = {
            actionId: selectedAct,
            paramsAction: '',
            reactionId: selectedReact,
            paramsReaction: ''
        };
        await API.post(`/user/addArea?accessToken=${global.accessToken}`, body)
        .then(res => res.data)
        .then(res => {
          if (res.success === true)
            close();
        })
        .catch(error => {
          console.log(error)
        })
    }
    return(
        <View>
            <Modal visible={open} animationType='slide' transparent={true}>
                <View style={tailwind('flex-1 bg-white')}>
                    <NavigationContainer independent={true}>
                        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                            <Tab.Screen name="Actions">
                                {() => <ActionPage actions={actions} close={() => {close(); setSelectedAct(null); setSelectedReact(null)}} selected={selectedAct} setSelected={setSelectedAct} act={act} onClick={() => handleClick()}/>}
                            </Tab.Screen>
                            <Tab.Screen name="Reactions">
                                {() => <ReactionPage reactions={reactions} close={() => {close(); setSelectedAct(null); setSelectedReact(null)}} selected={selectedReact} setSelected={setSelectedReact} act={act} onClick={() => handleClick()}/>}
                            </Tab.Screen>
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            </Modal>
        </View>
    )
}