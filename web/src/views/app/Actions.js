import React from 'react'

class Actions extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pt-4" style={{minHeight: 'calc(100vh - 3.5rem)'}}>
                <h1 className="text-4xl font-bold mb-4 text-center">You didn&apos;t set any actions.</h1>
            </div>
        )
    }
}

export default Actions
