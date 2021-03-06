import React from 'react'
import Cookies from 'js-cookie'
import API from '../../api'
import { AreaCreator } from '../../components'

class Actions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userAreas: null
        }
    }

    componentDidMount() {
        const user = Cookies.get('user')

        API.get('/user/getAreas?accessToken=' + user)
            .then(json => {
                this.setState({userAreas: json.data.data})
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
                                        <div key={i} className="flex w-full bg-purple-400">
                                            {e.action.name} → {e.reaction.name}
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        <div>
                            <h1 className="text-4xl font-bold mb-4 text-center">You didn&apos;t set any actions.</h1>
                        </div>
                }
                <AreaCreator/>
            </div>
        )
    }
}

export default Actions
