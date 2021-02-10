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
                <Input text={'Email..'} getValue={(email) => setEmail(email)}/>
                <Input text={'Password...'} isPassword={true} getValue={(password) => setPassword(password)}/>
                <View style={tailwind('flex-col h-24 justify-around')}>
                    <Button text='Login' onClick={() => _loginHandle()}/>
                    <Button text="Sign Up" onClick={() => setRegistering(true)}/>
                </View>
            </View>
        )
    else
        return (
            <View style={tailwind('flex-col bg-gray-50 rounded-3xl w-4/6 h-72 justify-evenly px-4')}>
                <Input text={'Username..'}/>
                <Input text={'Email..'}/>
                <Input text={'Password..'} isPassword={true}/>
                <Input text={'Verifying the password..'} isPassword={true}/>
                <View style={tailwind('flex-col h-24 justify-around')}>
                    <Button text='Create my account' onClick={() => _registerHandle}/>
                    <Button text="Already have an account?" onClick={() => setRegistering(false)}/>
                </View>
            </View>
        )
}
