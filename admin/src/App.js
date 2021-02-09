import React from 'react'
import './App.css'
import { LoginForm } from './components'

function App() {
    return (
        <div className="bg-hero-home min-h-screen flex items-center justify-center">
            <div className="grid grid-cols-5 items-center justify-center">
                <div className="row-start-1 col-start-2 col-span-2">
                    <h1 className="text-8xl text-black font-bold mx-auto max-w-6xl">
                        <span className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-700 to-yellow-500">Area 51</span>
                        <br/>
                    </h1>
                </div>
                <div className="row-start-1 col-start-4 col-span-1">
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}

export default App
