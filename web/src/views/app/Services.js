import React from 'react'
import Cookies from 'js-cookie'
import API from '../../api'

class Services extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            servicesData: [],
            userConnected: []
        }
    }

    componentDidMount() {
        const userToken = Cookies.get('user')

        API.get('/user/getUserData?accessToken=' + userToken)
            .then(json => json.data)
            .then(data => {
                console.log(data.userData.services)
                this.setState({userConnected: data.userData.services})
            })
        API.get('/service/getServices', {
            params: {
                accessToken: userToken
            }
        })
            .then(json => json.data)
            .then(data => {
                console.log(data)
                this.setState({servicesData: data.services})
            })
    }

    render() {
        return (
            <div className="pt-4" style={{minHeight: 'calc(100vh - 3.5rem)'}}>
                <h1 className="text-4xl font-bold mb-4">Services</h1>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                    {
                        this.state.servicesData.map((element, i) => {
                            return (
                                <div key={i} className="w-full h-full border rounded-md flex shadow-md bg-blue-300" style={{backgroundColor: `${element.secondaryColor}`, height: 75, borderColor: element.primaryColor}}>
                                    <div className="m-auto">
                                        <img src={element.logo} alt={`${element.name} logo`} className="m-auto" style={{height: 50}}/>
                                    </div>
                                    <span className="m-auto font-bold" style={{color: element.primaryColor}}>
                                        {element.displayName !== undefined ? element.displayName : element.name}
                                    </span>
                                    {
                                        this.state.userConnected.includes(element.name) ?
                                            <div className="text-sm text-center m-auto">
                                                <span className="text-green-500">Already connected</span><br/>
                                                <a href={element.OAuthUrl} className="text-xs">Reconnect</a>
                                            </div> :
                                            <a href={element.OAuthUrl} className="focus:outline-none text-white text-sm font-bold py-2.5 px-5 rounded-md hover:shadow-lg border m-auto block text-center align-middle" style={{backgroundColor: element.primaryColor, borderColor: element.secondaryColor}}>
                                                Connect
                                            </a>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Services
