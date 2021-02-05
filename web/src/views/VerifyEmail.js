import React from 'react'

class VerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ongoing: false,
            success: false
        }
    }
    
    render() {
        if (this.state.ongoing === true) {
            return (
                <div className="flex flex-col items-center justify-center w-full min-h-screen text-black md:justify-center text-center">
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
                        <h1 className="text-3xl font-bold text-green-500">Success!</h1>
                        <div className="font-medium">
                            Your account is now verified.<br/>
                            You can now use your account on Area.
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="flex flex-col items-center justify-center w-full min-h-screen text-black md:justify-center text-center">
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
