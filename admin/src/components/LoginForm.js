import React from 'react'
import API from '../api'
import FormNotification from './FormNotification'

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        userData: '',
        title: '',
        message: '',
        success: null
    }

    handleChange(event) {
        let id = event.target.id
        let value = event.target.value
        this.setState({[id]: value})
    }

    handleValidation(e) {
        if (e.target.id === 'login') {
            if (!this.state.email || !this.state.password) {
                this.setState({success: false, message: 'You have to fill all the form.'})
                return false
            }
            return true
        }
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
                    if (json.success) {
                        if (json.is_admin) {
                            this.setState({success: true, userData: json, title: 'Hey!', message: `Welcome back ${json.username}!`})
                        } else {
                            this.setState({success: false, title: 'Oh oh..', message: 'You need some privileges to access this page.'})
                        }
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

        if (this.state.success === false) {
            notification = <FormNotification error title={this.state.title} message={this.state.message}/>
        } else if (this.state.success === true) {
            notification = <FormNotification success title={this.state.title} message={this.state.message}/>
        }
        let login = (
            <form id ="login" onSubmit={(event) => this.handleLogin(event)} className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Admin session</h1>
                {notification}
                <div className="w-full space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 text-left">Email address</label>
                    <input type="email" id="email" onChange={this.handleChange.bind(this)} autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500 text-left">Password</label>
                    <input type="password" id="password" onChange={this.handleChange.bind(this)} autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <footer className="grid grid-cols-1 divide-y divide-dashed w-full divide-gray-300">
                    <div className="w-full my-2">
                        <button type="submit" className="text-base font-medium rounded-xl p-3 bg-blue-500 text-white w-full transition duration-300 border focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">Log In</button>
                    </div>
                </footer>
            </form>
        )

        return (
            <div style={{transition: 'width'}}>
                {login}
            </div>
        )
    }
}

export default LoginForm
