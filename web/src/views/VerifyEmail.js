import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { LoadingSpinner, SuccessSpinner, FailSpinner } from '../assets/animations'

class VerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ongoing: false,
            success: true
        }
        this.player = React.createRef()
    }
    
    freezeAnimation() {
        if (this.player.current.state.instance.currentFrame > (this.player.current.state.instance.totalFrames - 1))
            this.player.current.pause()
    }

    render() {
        if (this.state.ongoing === true) {
            return (
                <div className="flex flex-col items-center justify-center w-full min-h-screen text-black md:justify-center text-center">
                    <Player autoplay loop src={LoadingSpinner} style={{ height: '100px', width: '100px' }}></Player>
                    <h1 className="text-3xl font-bold">Verifying your email...</h1>
                    <div className="font-medium">
                        We are now verifying your email address with our server.<br/>
                        If nothing happen in 5 seconds, you can refresh the page by clicking here.
                    </div>
                </div>
            )
        } else {
            if (this.state.success === true) {
                return (
                    <div className="flex flex-col items-center justify-center w-full min-h-screen text-black md:justify-center text-center">
                        <Player
                            onEvent={event => {
                                if (event === 'frame') this.freezeAnimation()
                            }}
                            ref={this.player}
                            autoplay
                            loop
                            src={SuccessSpinner}
                            style={{ height: '100px', width: '100px' }}>
                        </Player>
                        <h1 className="text-3xl font-bold text-blue-400">Success!</h1>
                        <div className="font-medium">
                            Your account is now verified.<br/>
                            You can now use your account on Area.
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="flex flex-col items-center justify-center w-full min-h-screen text-black md:justify-center text-center">
                        <Player
                            onEvent={event => {
                                if (event === 'frame') this.freezeAnimation()
                            }}
                            ref={this.player}
                            autoplay
                            loop
                            src={FailSpinner}
                            style={{ height: '100px', width: '100px' }}
                        ></Player>
                        <h1 className="text-3xl font-bold text-red-500">Something bad happened...</h1>
                        <div className="font-medium">
                            Oh oh.. An error occurred.<br/>
                            Your link seems to be invalid.
                        </div>
                    </div>
                )
            }
        }
    }
}

export default VerifyEmail
