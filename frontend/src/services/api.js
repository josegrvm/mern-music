import axios from 'axios'

// 👉 Cambia el dominio si tu backend está desplegado
const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export default API