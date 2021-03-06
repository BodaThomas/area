import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { Actions, Services, OAuth, Account } from '../views/app'
import Cookies from 'js-cookie'
import API from '../api'

class NavBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    handleDisconnect() {
        Cookies.remove('user')
        this.setState({redirect: '/'})
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
                    this.handleDisconnect()
                })
        }
    }

    render() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirect}/>
        return (
            <Router>
                <header className="w-full relative h-14 z-40 text-gray-400 bg-white shadow-sm" style={{borderBottomWidth: '1px'}}>
                    <div className="relative h-full flex flex-row justify-between">
                        <div className="flex items-center justify-start font-bold">
                            <div className="flex flex-col justify-center mx-4 px-2 min-h-full">
                                <span className="text-2xl text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                                    <NavLink to="/app">Area</NavLink>
                                </span>
                            </div>
                            <NavLink activeClassName="border-blue-500 border-b-2" to="/app/actions" className="navbar flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm">
                                    Actions
                                </div>
                            </NavLink>
                            <NavLink activeClassName="border-blue-500 border-b-2" to="/app/services" className="navbar flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm">
                                    Services
                                </div>
                            </NavLink>
                        </div>
                        <div className="flex items-center justify-end font-bold">
                            <NavLink activeClassName="border-blue-500 border-b-2" to="/app/account" className="navbar flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm">
                                    Account
                                </div>
                            </NavLink>
                            <button onClick={this.handleDisconnect.bind(this)} className="navbar flex flex-col justify-center mx-4 px-2 min-h-full hover:text-gray-500 hover:bg-gray-50">
                                <div className="text-sm text-red-700 font-bold">
                                    Disconnect
                                </div>
                            </button>
                        </div>
                    </div>
                </header>
                <div className="xl:px-96 lg:px-80 md:px-72 px-12 bg-views">
                    <Route exact path="/app" component={Actions}/>
                    <Route exact path="/app/actions" component={Actions}/>
                    <Route exact path="/app/services" component={Services}/>
                    <Route path="/app/oauth/:id" component={OAuth}/>
                    <Route exact path="/app/account" component={Account}/>
                </div>
            </Router>
        )
    }
}

export default NavBar
