import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage, VerifyEmail, NotFound, AppHome } from './views'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/verifyemail' component={VerifyEmail}/>
                <Route path='/app' component={AppHome}/>
                <Route component={NotFound}/>
            </Switch>
        </Router>
    )
}

export default App
