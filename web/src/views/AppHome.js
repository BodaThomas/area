import React from 'react'
import { NavBar } from '../components'

class AppHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="min-h-screen">
                <NavBar/>
            </div>
        )
    }
}

export default AppHome
