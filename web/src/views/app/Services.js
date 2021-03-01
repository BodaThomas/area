import React from 'react'
import Cookies from 'js-cookie'
import API from '../../api'

class Services extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            servicesData: []
        }
    }

    componentDidMount() {
        const userToken = Cookies.get('user')

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
            <div className="" style={{minHeight: 'calc(100vh - 3.5rem)'}}>
                <h1 className="text-4xl font-bold my-4">Services</h1>
                <div className="grid grid-cols-3 gap-4">
                    {
                        this.state.servicesData.map((element, i) => {
                            console.log(element)
                            return (
                                <div key={i} className="w-full h-full border rounded-md flex" style={{backgroundColor: `${element.secondaryColor}`, height: 200, borderColor: element.primaryColor}}>
                                    <div className="m-auto">
                                        <img src={element.logo} alt={`${element.name} logo`} className="m-auto" style={{height: 150}}/>
                                        <a href={element.OAuthUrl} className="focus:outline-none text-white text-sm font-bold py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg border m-auto" style={{backgroundColor: element.primaryColor, borderColor: element.secondaryColor}}>
                                            Connect
                                        </a>
                                    </div>
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
