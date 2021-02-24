import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { Actions } from '../views/app'
import Cookies from 'js-cookie'
import API from '../api'

class NavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        let userToken = Cookies.get('user')

        if (userToken === undefined)
            this.setState({redirect: '/'})
        else {
            API.post('/user/checkLogin', {
                accessToken: userToken
            })
                .catch(() => {
                    Cookies.remove('user')
                    this.setState({redirect: '/'})
                })
        }
    }

    render() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        return (
            <Router>
                <header className="w-full relative h-14 z-40 text-gray-400 bg-white" style={{borderBottomWidth: '1px'}}>
                    <div className="relative h-full flex flex-row justify-between">
                        <div className="flex items-center justify-start font-bold">
                            <div className="flex flex-col justify-center mx-4 px-2 min-h-full">
                                <span className="text-2xl text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                                    <NavLink to="/app">Area</NavLink>
                                </span>
                            </div>
                            <NavLink activeClassName="border-blue-500 border-b-2" to="/app/actions" className="flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm">
                                    Actions
                                </div>
                            </NavLink>
                            <NavLink activeClassName="border-blue-500 border-b-2" to="/app/services" className="flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm">
                                    Services
                                </div>
                            </NavLink>
                        </div>
                        <NavLink activeClassName="border-blue-500 border-b-2" to="/app/account" className="flex items-center justify-end font-bold hover:text-gray-500 hover:bg-gray-50">
                            <div className="flex flex-col justify-center mx-4 px-2 text-sm min-h-full">
                                Account
                            </div>
                        </NavLink>
                    </div>
                </header>
                <div className="px-96">
                    <Route exact path="/app/actions" component={Actions}/>
                </div>
            </Router>
        )
    }
}

export default NavBar
