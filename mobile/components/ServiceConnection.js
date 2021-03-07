import React, { useState } from 'react';
import {View, Pressable, Text, Image, Modal, Dimensions} from 'react-native'
import { Feather } from '@expo/vector-icons';
import tailwind from 'tailwind-rn';

import {WebView} from 'react-native-webview'
import * as AuthSession from 'expo-auth-session';
import API from '../Api.js'
import { useEffect } from 'react/cjs/react.development';

class Web extends React.Component {
    render() {
        const url = this.props.url
        const close = this.props.close
        const getUrl = this.props.getUrl
        return(
            <WebView ref="webview" style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={{uri: url}} onNavigationStateChange={this._onNavigationStateChange.bind(this)}/>
        )
    }

    _onNavigationStateChange(webState) {
        // looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        if (webState.url.includes('http://localhost:8081/app/oauth')) {
            this.props.getUrl(webState.url)
            this.props.close()
        }
    }
}

export default function ServiceConnection({item}) {
    const [connected, setConnected] = useState(false)
    const [url, setUrl] = useState('')
    const [openWeb, setOpenWeb] = useState(false)
    const [google, setGoogle] = useState(false)

    async function sendToken() {
        let isCode = false
        let toGet = url.split(/\?|#/g)[1]
        console.log('toGet: ', toGet)
        if (toGet === null) {
            isCode = true
            toGet = url.match(/(?:code=)(.*?)(?=&|$)/)
        }
        let value = toGet.toString()
        let result = value.split('&').reduce(function(result, item) {
            let parts = item.split('=')

            result[parts[0]] = parts[1]
            return (result)
        }, {})
        console.log(result)
        let body = {
            serviceName: item.name,
            ...result
        }
        API.post(`/tokens/addToken?accessToken=${global.accessToken}`, body)
            .then(res => res.data)
            .then(json => {
                console.log(json)
                //SUCCESS
                setConnected(true)
            })
            .catch(error => {
                //ERROR
                setError(error.response.data.message)
            })
    }

    async function getToken() {
            const l_url = encodeURIComponent(AuthSession.getRedirectUrl({useProxy: false}))
            const toReplace = item.OAuthUrl.match(/(?:redirect_uri=)(.*?)(?=&|$)/)
            var o_url = item.OAuthUrl
            if (toReplace !== null)
                o_url = item.OAuthUrl.replace(toReplace[1], `${l_url}`)
            const result = await AuthSession.startAsync({authUrl: `${o_url}`})
            if (result.type === 'success')
            setUrl(result.url)
    }

    if (google)
        getToken()
    console.log('url: ', url)
    useEffect(() => {
        if (url !== '') {
            sendToken()
        }
    }, [url])


    if (!connected) return (
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <Modal visible={openWeb} animationType='slide' transparent={true}>
                <View style={tailwind('flex-1')}>
                    <Web url={item.OAuthUrl} style={{flex: 1}} close={() => {item.name === 'youtube' || item.name === 'gmail' ? setGoogle(false) : setOpenWeb(false)}} getUrl={setUrl}></Web>
                </View>
            </Modal>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.primaryColor, borderWidth: 3, justifyContent: 'space-between'}}>
                <Image source={{uri: item.logo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.name} </Text>
                </View>
                <Pressable style={{backgroundColor: item.primaryColor, borderRadius: 4, padding: 4}} onPress={() => {item.name === 'youtube' || item.name === 'gmail' ? setGoogle(true) : setOpenWeb(true)}}>
                    <Text style={tailwind('font-bold capitalize text-white')}> Connect </Text>
                </Pressable>
            </View>
        </View>
    )
    else return(
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', borderColor: item.primaryColor, borderWidth: 3, justifyContent: 'space-between'}}>
                <Image source={{uri: item.logo}} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                <View style={tailwind('items-center justify-center')}>
                    <Text style={tailwind('self-stretch text-2xl font-bold capitalize')}> {item.name} </Text>
                </View>
                <Feather name="check-circle" size={40} color="black" />
            </View>
        </View>
    )
}