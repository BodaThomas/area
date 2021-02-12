import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <header className="w-full relative h-14 z-40 text-gray-400 bg-white" style={{borderBottomWidth: '1px'}}>
                    <div className="relative h-full flex flex-row justify-between">
                        <div className="flex items-center justify-start font-bold">
                            <div className="flex flex-col justify-center px-4">
                                <span className="text-2xl text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                                    <a href="/app">Area</a>
                                </span>
                            </div>
                            <div className="flex flex-col justify-center px-4 text-sm">
                                <Link to="/app/actions" className="hover:text-gray-500">My actions</Link>
                            </div>
                            <div className="flex flex-col justify-center px-4 text-sm">
                                <Link to="/app/services" className="hover:text-gray-500">Services</Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-end font-bold">
                            <div className="flex flex-col justify-center px-4 text-sm">
                                <Link to="/app/account" className="hover:text-gray-500">My account</Link>
                            </div>
                        </div>
                    </div>
                </header>
                <Route exact path="/app/actions"/>
            </Router>
        )
    }
}

export default NavBar
