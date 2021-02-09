import tailwind from 'tailwind-rn'
import React, { useState } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';

import Input from './Input.js'
import Button from './Button.js'
import {login, register} from '../Api.js'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [registering, setRegistering] = useState(false)

    async function _loginHandle() {
        console.log("login")
        const ret = await login(email, password)
        console.log(ret)
    }

    async function _registerHandle() {
        console.log("register")
        const ret = await register(email, password)
        console.log(ret)
    }

    if (!registering)
        return(
            <View style={tailwind('flex-col bg-gray-50 rounded-3xl w-4/6 h-72 justify-evenly px-4 bg-opacity-90')}>
                <Input text={'Email...'} getValue={(email) => setEmail(email)}/>
                <Input text={'Mot de passe...'} isPassword={true} getValue={(password) => setPassword(password)}/>
                <View style={tailwind('flex-col h-24 justify-around')}>
                    <Button text='Se connecter' onClick={() => _loginHandle()}/>
                    <Button text="Créer un compte" onClick={() => setRegistering(true)}/>
                </View>
            </View>
        )
    else
        return (
            <View style={tailwind('flex-col bg-gray-50 rounded-3xl w-4/6 h-72 justify-evenly px-4')}>
                <Input text={'Nom d\'utilisateur...'}/>
                <Input text={'Email...'}/>
                <Input text={'Mot de passe...'} isPassword={true}/>
                <Input text={'Vérification du mot de passe...'} isPassword={true}/>
                <View style={tailwind('flex-col h-24 justify-around')}>
                    <Button text='Créer mon compte' onClick={() => _registerHandle}/>
                    <Button text="Déjà un compte ?" onClick={() => setRegistering(false)}/>
                </View>
            </View>
        )
}
