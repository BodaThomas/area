import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomePage, VerifyEmail, NotFound } from './views'

function App() {
    return (
        <Router>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/verifyemail' component={VerifyEmail}/>
            <Route component={NotFound}/>
        </Router>
    )
}

export default App
