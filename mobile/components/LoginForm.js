import tailwind from 'tailwind-rn'
import React, { useState } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';

import Input from './Input.js'
import Button from './Button.js'
import API from '../Api.js'

export default function LoginForm({setError, setConnected}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [username, setUsername] = useState('')
    const [registering, setRegistering] = useState(false)

    async function _loginHandle() {
        console.log("login")
        if (email === '')
            setError('The email field is empty.')
        else if (password === '')
            setError('The password field is empty')
        else {
            let body = {
                email,
                password
            }
            API.post('/user/login', body)
                .then(res => res.data)
                .then(json => {
                    //SUCCESS
                    setConnected(true)
                })
                .catch(error => {
                    //ERROR
                    setError(error.response.data.message)
                })
        }
    }

    async function _registerHandle() {
        console.log("register")
        if (username === '')
            setError('The username field is empty.')
        else if (email === '')
            setError('The email field is empty.')
        else if (password === '')
            setError('The password field is empty.')
        else if (passwordCheck === '')
            setError('The password checker field is empty.')
        else if (password !== passwordCheck)
            setError('The password check is invalid.')
        else {
            let body = {
                username,
                email,
                password
            }
            API.post('/user/register', body)
                .then(res => res.data)
                .then(json => {
                    //SUCCESS
                    setError("An Email has been sent to you ! Please verify your account before connecting.")
                })
                .catch(error => {
                    //ERROR
                    setError("FDP")
                })
        }
    }

    if (!registering)
        return(
            <View style={tailwind('flex-col bg-gray-50 rounded-3xl w-4/6 px-4')}>
                <Input text={'Email..'} getValue={(email) => setEmail(email)} style={'pt-4 pb-2'}/>
                <Input text={'Password...'} isPassword={true} getValue={(password) => setPassword(password)} style={'py-2'}/>
                <View style={tailwind('flex-col')}>
                    <Button text='Login' onClick={() => _loginHandle()} style={'py-2'}/>
                    <Button text="Sign Up" onClick={() => setRegistering(true)} style={'pb-4'}/>
                </View>
            </View>
        )
    else
        return (
            <View style={tailwind('flex-col bg-gray-50 rounded-3xl w-4/6 px-4')}>
                <Input text={'Username..'} getValue={(username) => setUsername(username)} style={'pt-4 pb-2'}/>
                <Input text={'Email..'} getValue={(email) => setEmail(email)} style={'py-2'}/>
                <Input text={'Password..'} isPassword={true} getValue={(password) => setPassword(password)} style={'py-2'}/>
                <Input text={'Verifying the password..'} isPassword={true} getValue={(passwordCheck) => setPasswordCheck(passwordCheck)} style={'py-2'}/>
                <View style={tailwind('flex-col')}>
                    <Button text='Create my account' onClick={() => _registerHandle()} style={'py-2'}/>
                    <Button text="Already have an account?" onClick={() => setRegistering(false)} style={'pb-4'}/>
                </View>
            </View>
        )
}
