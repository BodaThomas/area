import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomePage, VerifyEmail } from './views'

function App() {
    return (
        <Router>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/verifyemail' component={VerifyEmail}/>
        </Router>
    )
}

export default App
