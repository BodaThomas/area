import React from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import API from '../../api'

class OAuthView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            success: null,
            redirect: null
        }
    }

    componentDidMount() {
        const user = Cookies.get('user')
        let result
        let values

        if (this.props.location.hash)
            values = window.location.hash.substr(1)
        if (this.props.location.search)
            values = window.location.search.substr(1)
        result = values.split('&').reduce(function (result, item) {
            let parts = item.split('=')

            result[parts[0]] = parts[1]
            return result
        }, {})
        API.post('/tokens/addToken', {
            userAccessToken: user,
            serviceName: this.props.match.params.id,
            ...result
        })
            .then(res => res.data)
            .then(json => {
                if (json.success === true) {
                    console.log('ok oauth')
                    this.setState({success: true, redirect: <Redirect to='/app/services'/>})
                } else {
                    this.setState({success: false})
                }

            })
            .catch(error => {
                console.log(error.response)
                this.setState({success: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect}
                <div>
                    {
                        this.state.success !== false ? 
                            <b>Linking your {this.props.match.params.id} account to Area...</b> :
                            <b className="text-red-500">Failed to link your {this.props.match.params.id} account to Area.</b>
                    }
                </div>
            </div>
        )
    }
}

OAuthView.propTypes = {
    location: PropTypes.object,
    match: PropTypes.object
}

export default OAuthView
