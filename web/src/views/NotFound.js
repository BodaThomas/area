import React from 'react'

class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bg-hero-notfound min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-5 items-center justify-center">
                    <div className="row-start-1 col-start-2 col-span-2">
                        <h1 className="text-9xl text-black font-bold mx-auto max-w-6xl">
                            <span className="text-transparent bg-gradient-to-r bg-clip-text from-red-600 to-pink-400">Oh oh...</span>
                            <br/>
                            This page doesn&apos;t exist.
                        </h1>
                        <a href="/">← Go back home</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound
