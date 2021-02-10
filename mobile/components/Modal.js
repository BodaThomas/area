import React, { useState } from 'react';
import { Modal, TouchableHighlight, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

export default function ModalView(open) {
    const [modVisible, setModVisible] = useState(false)

    return (
        <Modal animationType={"slide"} transparent={false} visible={modVisible} onRequestClose={() => {console.log("Modal has been closed")}}>
            <View style={tailwind('flex-1 items-center bg-blue-200 opacity-20 p-4')}>
                <Text>SALUT</Text>
                <TouchableHighlight onPress={() => {setModVisible(!modVisible)}}>
                    <Text>Close</Text>
                </TouchableHighlight>
            </View>
        </Modal>
    )
}
