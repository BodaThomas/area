import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ActionPage from './ActionPage.js'
import ReactionPage from './ReactionPage.js'

import { AntDesign } from '@expo/vector-icons';

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
    return(
        <Modal visible={open} animationType='slide' transparent={true}>
            <View style={tailwind('flex-1 bg-white')}>
                <NavigationContainer independent={true}>
                    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                        <Tab.Screen name="Actions">
                            {() => <ActionPage close={() => close()}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Reactions">
                            {() => <ReactionPage close={() => close()}/>}
                        </Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </Modal>
    )
}