import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.1.13:8080'
})

/* export async function login(email, password) {
    try {
        console.log("login function")
        let body = {
            'email': email,
            'password': password
        }
        console.log(body)
    //    let body = new FormData()
    //    body.append('email', email)
    //    body.append('password', password)
        const res = await Axios.post('http://127.0.0.1:8080/login', body, {headers:{'Accept': 'application/json'}})
    //    const res = await Axios.post(`http://127.0.0.1:8080/login`, body, {headers: {Accept: 'application/json'}})
        return res.data
    } catch(e) {
        console.log(e)
        return null
    }
}

export async function register(username, email, password) {
    try {
        let body = new FormData()
        body.append('username', username)
        body.append('email', email)
        body.append('password', password)
        const res = await Axios.post(`http://127.0.0.1:8080/register`, body, {headers: {Accept: 'application/json'}})
        return res.data
    } catch(e) {
        console.log(e)
        return null
    }
} */