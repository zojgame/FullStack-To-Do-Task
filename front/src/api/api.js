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

export const getUserBaskets = async () => {
    try {
        const userName = localStorage.getItem('user')
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/basket/getUserBaskets/${userName}`, 
        {
            headers: {
            Authorization: `Bearer ${token}`            
        }})
    
        return response
        
    } catch (error) {
        return error;
    }
}

export const createBasket = async (title, isPublic, items) => {
    const token = localStorage.getItem('token') 
    const response = await axios.post(`${URL}/basket/createBasket`, {
        owner: `${localStorage.getItem('user')}`,
        items: items,
        isPublic: isPublic,
        name: title
    }, 
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        globalStore.setMessage('Корзина создана')})
    .catch(err => globalStore.setMessage(`Ошибка ${err}`))

    return response;
      
}

// export const getCurrentBasket = async (basketId) => {
//     try {
//         const response = await axios
//         .get(`${URL}/basket/getCurrent/${basketId}`)
//         .then(res => res.data)
//         .catch(err => console.error(err));

//         return response;
        
//     } catch (error) {
//         console.error(error)
//     }
// }

export const getCurrentUserBasket = async(id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/basket/getCurrent/${id}`, {headers: {
            Authorization: `Bearer ${token}`            
        }})

    return response;
}
