import React from 'react'
import API from '../api'
import FormNotification from './FormNotification'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: 'login',
            email: '',
            password: '',
            userData: '',
            success: null,
            title: '',
            message: '',
        }
    }

    componentDidMount() {
        let userToken = Cookies.get('user')
        
        if (userToken !== undefined) {
            API.post('/user/checkLogin', {
                accessToken: userToken
            })
                .then(json => json.data)
                .then(data => {
                    if (data.success === true)
                        this.setState({redirect: '/app'})
                })
                .catch(() => Cookies.remove('user'))
        }
    }

    handleChange(event) {
        let fieldName = event.target.id
        let fieldVal = event.target.value
        this.setState({[fieldName]: fieldVal})
    }
    
    handleValidation(e) {
        console.log(e)
        if (e.target.id === 'login') {
            if (!this.state.email || !this.state.password) {
                this.setState({success: false, message: 'You have to fill all the form.'})
                return false
            }
            return true
        } else if (e.target.id === 'register') {
            if (!this.state.username || !this.state.email || !this.state.password) {
                this.setState({success: false, message: 'You have to fill all the form.'})
                return (false)
            }
            if (e.target.elements.emailConf.value !== this.state.email) {
                this.setState({success: false, message: 'The two emails does not match.'})
                return (false)
            }
            if (e.target.elements.passwordConf.value !== this.state.password) {
                this.setState({success: false, message: 'The two passwords does not match.'})
                return (false)
            }
            return true
        }
        return false
    }

    handleLogin(event) {
        event.preventDefault()
        if (this.handleValidation(event)) {
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            console.log(data)
            API.post('/login', data)
                .then(res => res.data)
                .then(json => {
                    console.log(json)
                    if (json.success) {
                        Cookies.set('user', json.accessToken, { expires: 7 })
                        this.setState({success: true, userData: json, title: 'Hey!', message: `Welcome back ${json.username}!`})
                        setTimeout(() => {this.setState({redirect: '/app'})}, 2000)
                    } else {
                        this.setState({success: false, title: 'Oh oh..', message: json.message})
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data)
                        this.setState({success: false, title: 'Oh oh..', message: error.response.data.message})
                    } else {
                        this.setState({success: false, title: 'Oh oh..', message: 'An awkward error occurred..'})
                    }
                })
        }
    }

    handleRegister(event) {
        event.preventDefault()
        if (this.handleValidation(event)) {
            let data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            API.post('/register', data)
                .then(res => res.data)
                .then(json => {
                    console.log(json)
                    if (json.success) {
                        this.setState({success: true, userData: json, title: `Welcome ${json.username}!`, message: 'Your account is now created.'})
                    } else {
                        this.setState({success: false, title: 'Oh oh..', message: json.message})
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    this.setState({success: false, title: 'Oh oh..', message: error.response.data.message})
                })
        }
    }

    render() {
        let notification = ''

        if (this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        if (this.state.success === false) {
            notification = <FormNotification error title={this.state.title} message={this.state.message}/>
        } else if (this.state.success === true) {
            notification = <FormNotification success title={this.state.title} message={this.state.message}/>
        }
        const login = (
            <form id="login" onSubmit={(e) => this.handleLogin(e)} className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Connect your life</h1>
                {notification}
                <div className="w-full space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 text-left">Email</label>
                    <input type="email" id="email" autoFocus="" onChange={this.handleChange.bind(this)} className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500 text-left">Password</label>
                    <input type="password" id="password" autoFocus="" onChange={this.handleChange.bind(this)} className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <footer className="grid grid-cols-1 divide-y divide-dashed w-full divide-gray-300">
                    <div className="w-full my-2">
                        <button type="submit" className="text-base font-medium rounded-xl p-3 bg-blue-500 text-white w-full transition duration-300 border focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">Log In</button>
                    </div>
                    <div className="w-full my-2">
                        <p className="text-sm font-semibold text-gray-500 text-center my-2">Don&apos;t have an account?</p>
                        <button className="text-base font-medium rounded-xl p-3 bg-white text-black w-full transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-gray-100" onClick={(event)=>{event.preventDefault(); this.setState({form: 'register'})}}>Sign Up</button>
                    </div>
                </footer>
            </form>
        )
        const register = (
            <form id="register" onSubmit={(e) => this.handleRegister(e)} className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Register your life</h1>
                {notification}
                <div className="w-full space-y-1">
                    <label htmlFor="username" className="text-sm font-semibold text-gray-500 text-left">Username</label>
                    <input type="username" id="username" autoFocus="" onChange={this.handleChange.bind(this)} className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 text-left">Email address</label>
                    <input type="email" id="email" autoFocus="" onChange={this.handleChange.bind(this)} className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="emailConf" className="text-sm font-semibold text-gray-500 text-left">Email address confirmation</label>
                    <input type="email" id="emailConf" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500 text-left">Password</label>
                    <input type="password" id="password" autoFocus="" onChange={this.handleChange.bind(this)} className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="passwordConf" className="text-sm font-semibold text-gray-500 text-left">Password confirmation</label>
                    <input type="password" id="passwordConf" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <footer className="grid grid-cols-1 divide-y divide-dashed w-full divide-gray-300">
                    <div className="w-full my-2">
                        <button type="submit" className="text-base font-medium rounded-xl p-3 bg-green-500 text-white w-full transition duration-300 border focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200  hover:bg-green-600">Sign Up</button>
                    </div>
                    <div className="w-full my-2">
                        <p className="text-sm font-semibold text-gray-500 text-center my-2">Already have an account?</p>
                        <button className="text-base font-medium rounded-xl p-3 bg-white text-black w-full transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-gray-100" onClick={(event)=>{event.preventDefault(); this.setState({form: 'login'})}}>Log In</button>
                    </div>
                </footer>
            </form>
        )

        return (
            <div style={{transition: 'width'}}>
                {this.state.form === 'register' ? register : login}
            </div>
        )
    }
}

export default LoginForm
