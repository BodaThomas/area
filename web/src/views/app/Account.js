import React from 'react'
import Cookies from 'js-cookie'
import API from '../../api'
import { FormNotification } from '../../components'

class Account extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            email: null,
            success: null
        }
    }

    componentDidMount() {
        const user = Cookies.get('user')

        API.get('/user/getUserData?accessToken=' + user)
            .then(json => json.data)
            .then(data => {
                console.log(data)
                this.setState({
                    username: data.userData.username,
                    email: data.userData.email,
                    success: data.userData.success
                })
            })
    }

    render() {
        return (
            <div className="pt-4" style={{minHeight: 'calc(100vh - 3.5rem)'}}>
                <h1 className="text-4xl font-bold mb-4">
                    My account
                </h1>
                {
                    this.state.success === false ?
                        <FormNotification error message="There was an error by collecting your data."/> :
                        null
                }
                <div className="bg-white p-5 border rounded-md shadow-md">
                    <div>
                        <b>Username:</b> {this.state.username}
                    </div>
                    <div>
                        <b>Email address:</b> {this.state.email}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account
