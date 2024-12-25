import axios from 'axios'

const api = axios.create({
    baseURL:'https://api-barber-backend.onrender.com'
})

export {api}