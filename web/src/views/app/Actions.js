import React from 'react'
import Cookies from 'js-cookie'
import API from '../../api'
import { AreaCreator } from '../../components'

class Actions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userAreas: null,
            creatorIsActive: false
        }
    }

    handleGetArea(creatorIsActive) {
        const user = Cookies.get('user')

        API.get('/user/getAreas?accessToken=' + user)
            .then(json => {
                this.setState({userAreas: json.data.data, creatorIsActive})
            })
        console.log('user areas list updated')
    }

    componentDidMount() {
        this.handleGetArea(false)
    }

    handleDeleteArea(areaId) {
        const user = Cookies.get('user')

        API.post('/user/deleteArea?accessToken=' + user, {
            areaId
        }).then(res => {
            console.log(res.data)
            if (res.data.success === true)
                this.handleGetArea()
            return res
        })
    }

    render() {
        return (
            <div className="pt-4" style={{minHeight: 'calc(100vh - 3.5rem)'}}>
                {
                    this.state.userAreas && this.state.userAreas.length !== 0 ?
                        <div>
                            {
                                this.state.userAreas.map((e, i) => {
                                    console.log(e)
                                    return (
                                        <div key={i} className="flex w-full h-full border rounded-md shadow-sm cursor-pointer bg-gray-50 mt-2" style={{borderColor: e.reaction.service.pColor}}>
                                            <div className="w-full h-full rounded-md shadow-md cursor-pointer" style={{backgroundColor: `${e.action.service.sColor}`, height: 75, borderColor: e.reaction.service.pColor}}>
                                                <div className="flex mt-1">
                                                    <div className="m-auto">
                                                        <img src={e.action.service.urlLogo} alt={`${e.action.service.name} logo`} className="m-auto" style={{height: 40}}/>
                                                        {e.action.name}
                                                    </div>
                                                    <div className="h-full mt-auto mb-auto">→</div>
                                                    <div className="m-auto">
                                                        <img src={e.reaction.service.urlLogo} alt={`${e.reaction.service.name} logo`} className="m-auto" style={{height: 40}}/>
                                                        {e.reaction.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-full m-auto text-center p-2">
                                                <button onClick={() => {this.handleDeleteArea(e.id)}} className="p-4 pt-2 pb-2 bg-red-500 text-white font-bold rounded-xl border-2 border-red-600 hover:shadow-md focus:outline-none">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        <div>
                            <h1 className="text-4xl font-bold mb-4 text-center">You didn&apos;t set any actions.</h1>
                        </div>
                }
                {
                    this.state.creatorIsActive ?
                        <div className="pt-4">
                            <AreaCreator reloadAreas={this.handleGetArea.bind(this)}/>
                        </div>
                        :
                        <div className="pt-4">
                            <button onClick={() => {this.setState({creatorIsActive: true})}} className="col-span-full w-full text-white font-bold bg-gray-50 h-14 rounded-xl focus:outline-none border-gray-300 border-2 hover:shadow-md">
                                <span className="text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                                    Create a new A(ction)rea(ction)
                                </span>
                            </button>
                        </div>
                }
            </div>
        )
    }
}

export default Actions
