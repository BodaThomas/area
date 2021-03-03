import React from 'react'
import Cookies from 'js-cookie'
//import API from '../api'

class AreaCreator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            actionService: null,
            action: null,
            reactionService: null,
            reaction: null
        }
    }

    componentDidMount() {
        //const user  = Cookies.get('user')
    }

    render() {
        return (
            <div className="grid grid-cols-1 gap-4 p-4 rounded-xl bg-white border border-gray-300">
                <b>Action:</b>
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
                            this.state.actionService !== null ?
                                <span className="m-auto">
                                    Actions
                                </span> :
                                <span className="m-auto">
                                    You must select a service first
                                </span>
                        }
                    </div>
                </div>
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
                            this.state.actionService !== null ?
                                <span className="m-auto">
                                    Actions
                                </span> :
                                <span className="m-auto">
                                    You must select a service first
                                </span>
                        }
                    </div>
                </div>
                <div className="col-span-full">
                    Yo les bg
                </div>
            </div>
        )
    }
}

export default AreaCreator
