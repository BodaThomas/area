import React from 'react'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="w-full absolute h-14 z-40 border-b-2 text-black text-opacity-50">
                <div className="relative h-full flex flex-row justify-between">
                    <div className="flex items-center justify-start font-bold">
                        <div className="flex flex-col justify-center px-4">
                            <span className="text-2xl text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to-green-500">
                                Area
                            </span>
                        </div>
                        <div className="flex flex-col justify-center px-4 text-sm">My actions</div>
                        <div className="flex flex-col justify-center px-4 text-sm">Services</div>
                    </div>
                    <div className="flex items-center justify-end font-bold">
                        <div className="flex flex-col justify-center px-4 text-sm">My account</div>
                    </div>
                </div>
            </header>
        )
    }
}

export default NavBar
