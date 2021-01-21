import React from 'react'

class LoginForm extends React.Component {
    state = {
        form: 'login'
    }

    render() {
        let login = (
            <form className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Connect your life</h1>
                <div className="w-full space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 text-left">Email address</label>
                    <input type="email" id="email" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500 text-left">Password</label>
                    <input type="password" id="password" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <footer className="grid grid-cols-1 divide-y divide-dashed w-full divide-gray-300">
                    <div className="w-full my-2">
                        <button className="text-base font-medium rounded-xl p-3 bg-blue-500 text-white w-full transition duration-300 border focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-600">Log In</button>
                    </div>
                    <div className="w-full my-2">
                        <p className="text-sm font-semibold text-gray-500 text-center my-2">Don't have an account?</p>
                        <button className="text-base font-medium rounded-xl p-3 bg-white text-black w-full transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-gray-100" onClick={(event)=>{event.preventDefault(); this.setState({form: 'register'})}}>Sign Up</button>
                    </div>
                </footer>
            </form>
        )
        let register = (
            <form className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Register your life</h1>
                <div className="w-full space-y-1">
                    <label htmlFor="username" className="text-sm font-semibold text-gray-500 text-left">Username</label>
                    <input type="username" id="username" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500 text-left">Email address</label>
                    <input type="email" id="email" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="emailConf" className="text-sm font-semibold text-gray-500 text-left">Email address confirmation</label>
                    <input type="email" id="emailConf" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-500 text-left">Password</label>
                    <input type="password" id="password" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <div className="w-full space-y-1">
                    <label htmlFor="passwordConf" className="text-sm font-semibold text-gray-500 text-left">Password confirmation</label>
                    <input type="password" id="passwordConf" autoFocus="" className="text-black w-full px-4 py-2 transition duration-300 border border-gray-300 rounded-xl focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"/>
                </div>
                <footer className="grid grid-cols-1 divide-y divide-dashed w-full divide-gray-300">
                    <div className="w-full my-2">
                        <button className="text-base font-medium rounded-xl p-3 bg-green-500 text-white w-full transition duration-300 border focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200  hover:bg-green-600">Sign Up</button>
                    </div>
                    <div className="w-full my-2">
                        <p className="text-sm font-semibold text-gray-500 text-center my-2">Already have an account?</p>
                        <button className="text-base font-medium rounded-xl p-3 bg-white text-black w-full transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-gray-100" onClick={(event)=>{event.preventDefault(); this.setState({form: 'login'})}}>Log In</button>
                    </div>
                </footer>
            </form>
        )

        return (
            <div style={{transition: 'width'}}>
                {this.state.form === 'register' ? register : login}
            </div>
        )
    }
}

export default LoginForm