import React from 'react'

class LoginForm extends React.Component {
    state = {
        form: 'login'
    }

    render() {
        let login = (
            <form className="flex flex-col items-center justify-center bg-white text-black shadow-xl h-auto rounded-3xl space-y-3 px-7 border">
                <h1 className="my-4 text-2xl font-bold">Admin session</h1>
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
                </footer>
            </form>
        )
        return (
            <div style={{transition: "width"}}>
                {login}
            </div>
        )
    }
}

export default LoginForm;