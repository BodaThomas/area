import React from 'react'
import Cookies from 'js-cookie'
import API from '../api'

class AreaCreator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            actionService: null,
            action: null,
            paramsAction: null,
            actionSelector: {
                active: false,
                isService: false,
                isAction: false
            },
            reactionService: null,
            reaction: null,
            paramsReaction: null,
            reactionSelector: {
                active: false,
                isService: false,
                isReaction: false
            }
        }
    }

    async componentDidMount() {
        const user  = Cookies.get('user')
        const userData = await API.get('/user/getUserData?accessToken=' + user)
            .then(json => json.data)
            .then(data => {
                if (data.success === true) {
                    return data.userData
                }
            })
        const userServicesList = await API.get('/service/getServices?accessToken=' + user)
            .then(json => {
                let compatibleServices = []

                json.data.services.map(element => {
                    if (userData.services.includes(element.name))
                        compatibleServices.push(element)
                })
                return compatibleServices
            })
        const actionsList = await API.get('service/getAllActions?accessToken=' + user)
            .then(json => json.data.data)
        
        this.setState({userServicesList, actionsList})
    }

    render() {
        return (
            <div className="grid grid-cols-1 gap-4 p-4 rounded-xl bg-white border border-gray-300">
                <b>Action:</b>
                <div className="flex w-full h-28">
                    <div onClick={() => (this.setState({actionSelector: {active: true, isService: true, isAction: false}}))} className="flex m-auto h-full w-40 font-bold border bg-gray-50 border-dashed rounded-xl border-gray-300 text-center cursor-pointer hover:bg-gray-200" style={this.state.actionService !== null ? {backgroundColor: this.state.actionService.secondaryColor, borderColor: this.state.actionService.primaryColor, color: this.state.actionService.primaryColor} : null}>
                        {
                            this.state.actionService !== null ?
                                <span className="m-auto">
                                    <div className="m-auto">
                                        <img src={this.state.actionService.logo} alt={`${this.state.actionService.name} logo`} className="m-auto" style={{height: 50}}/>
                                    </div>
                                    {this.state.actionService.name}
                                </span> :
                                <span className="m-auto">
                                    Select a service
                                </span>
                        }
                    </div>
                    <div className="h-full flex">
                        <span className="m-auto">→</span>
                    </div>
                    <div onClick={() => (this.setState({actionSelector: {active: true, isService: false, isAction: true}}))} className="flex h-full w-40 font-bold border m-auto bg-gray-50 border-dashed rounded-xl border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                        {
                            this.state.actionService !== null ?
                                <span className="m-auto">
                                    {
                                        this.state.action !== null ? 
                                            <div className="m-auto">
                                                <img src={this.state.actionService.logo} alt={`${this.state.actionService.name} logo`} className="m-auto" style={{height: 50}}/>
                                                {this.state.action.name}
                                            </div>
                                            :
                                            <span>Action</span>
                                    }
                                </span> :
                                <span className="m-auto">
                                    You must select a service first
                                </span>
                        }
                    </div>
                </div>
                {
                    this.state.actionSelector.active && this.state.actionSelector.isService ?
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-300">
                            <b>Select the service:</b>
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    this.state.userServicesList.map((element, i) => {
                                        return (
                                            <div key={i} onClick={() => {this.setState({actionService: element, actionSelector: {active: true, isService: false, isAction: true}})}} className="w-full h-full border rounded-md flex shadow-md bg-blue-300 cursor-pointer" style={{backgroundColor: `${element.secondaryColor}`, height: 75, borderColor: element.primaryColor}}>
                                                <div className="m-auto">
                                                    <img src={element.logo} alt={`${element.name} logo`} className="m-auto" style={{height: 50}}/>
                                                </div>
                                                <span className="m-auto font-bold" style={{color: element.primaryColor}}>
                                                    {element.displayName !== undefined ? element.displayName : element.name}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                }
                {
                    this.state.actionSelector.active && this.state.actionSelector.isAction ?
                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-300">
                            <b>Select an action:</b>
                            <div className="grid grid-cols-1 gap-4">
                                {
                                    this.state.actionsList.map((element, i) => {
                                        if (element.serviceId === this.state.actionService.id) {
                                            return (
                                                <div key={i} onClick={() => {this.setState({action: element, actionSelector: {active: false, isService: false, isAction: false}})}} className="w-full h-full border rounded-md flex shadow-md bg-blue-300 cursor-pointer" style={{backgroundColor: `${this.state.actionService.secondaryColor}`, height: 75, borderColor: this.state.actionService.primaryColor}}>
                                                    <div className="m-auto">
                                                        <img src={this.state.actionService.logo} alt={`${this.state.actionService.name} logo`} className="m-auto" style={{height: 50}}/>
                                                    </div>
                                                    <span className="m-auto font-bold" style={{color: element.primaryColor}}>
                                                        {element.displayName !== undefined ? element.displayName : element.name}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                }
                <b>Reaction:</b>
                <div className="flex w-full h-28">
                    <div onClick={() => (console.log('actionService selector'))} className="flex m-auto h-full w-40 font-bold border bg-gray-50 border-dashed rounded-xl border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                        <span className="m-auto">
                            Select a service
                        </span>
                    </div>
                    <div className="h-full flex">
                        <span className="m-auto">→</span>
                    </div>
                    <div onClick={() => (console.log('actions selector'))} className="flex h-full w-40 font-bold border m-auto bg-gray-50 border-dashed rounded-xl border-gray-300 text-center cursor-pointer hover:bg-gray-200">
                        {
                            this.state.reactionService !== null ?
                                <span className="m-auto">
                                    Actions
                                </span> :
                                <span className="m-auto">
                                    You must select a service first
                                </span>
                        }
                    </div>
                </div>
                {
                    this.state.actionService && this.state.action && this.state.reactionService && this.state.reaction ?
                        <button onClick={() => {console.log(this.state.action, this.state.reaction)}} className="col-span-full w-full text-white font-bold bg-blue-500 h-14 rounded-xl shadow-sm focus:outline-none">
                            Create the Area
                        </button> :
                        <button onClick={() => {console.log(this.state.action, this.state.reaction)}} className="col-span-full w-full text-white font-bold bg-blue-500 h-14 rounded-xl shadow-sm focus:outline-none">
                            Disabled
                        </button>
                }
            </div>
        )
    }
}

export default AreaCreator
