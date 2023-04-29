const URL = 'http://127.0.0.1:7000'
import axios from "axios"
import { globalStore } from "../store/store";

export const getUsers = async () => {
    try {
        const response = await axios
        .get(`${URL}/basket/baskets`)
        .then(res => res.data)
        .catch(err => console.error(err));

        return response;
        
    } catch (error) {
        console.error(error)
    }
}

export const createUser = async (userName, password) => {    
        const response = await axios.post(`${URL}/auth/registration`, {
            username: userName,
            password: password
        })

        return response;
}

export const authUser = async (userName, password) => {    
    const response = await axios.post(`${URL}/auth/login`, {
        username: userName,
        password: password
    })

    return response;
}
