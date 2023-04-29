import { makeAutoObservable, configure } from 'mobx';
import { Task, Item } from '../types/types';
import axios from 'axios';
import dayjs from 'dayjs';


class Store {
    toastMessage: String = '';
    isUserAuth: Boolean = false;
    currentPageItems : Item[] = [];

    isCreateFormOpen : Boolean = false;
    userTasks : Task[] = []


    constructor(){
        makeAutoObservable(this);
    }

    switchCreationForm(){
        this.isCreateFormOpen = !this.isCreateFormOpen;
    }

    createTask(title: String, isDone: Boolean, deadline: Date, description: String, token: String, userName: String){
        const url = `http://127.0.0.1:7000/task/createTask`;
        try {
            axios.post(url, {
                title: title,
                isDone: isDone,
                description: description,
                username: userName,
                deadline: deadline
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(() => this.getAllUserTasks(userName, token))
        } catch (error) {
            console.log('error', error)
        }
    }

    getAllUserTasks(userName: String, token: String){
        const url = `http://127.0.0.1:7000/task/getUserTasks/${userName}`
        try {
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const userTasks = res.data as Task[]
                this.userTasks = userTasks.sort((curr, prev) => {
                    const isBefore = dayjs(curr.created).isBefore(prev.created)
                    return isBefore ? 1 : -1
                })
            });
        } catch (error) {
            console.log('error', error)
        }
        
    }

    async updateTask(taskId: String, newTask: Task, token: String, userName: String){
        const URL = `http://127.0.0.1:7000/task/update/${taskId}`;
        await this.getAllUserTasks(userName, token);
        let newUserTasks = this.userTasks.filter(task => task._id !== taskId);
        try {
            const response = await axios.put(URL, {
                title: newTask.title,
                isDone: newTask.isDone,
                description: newTask.description,
                deadline: newTask.deadline
            }, {
                headers: {
                Authorization: `Bearer ${token}`
            }}).then(res => {
                newUserTasks = [...newUserTasks, res.data.task]
                this.userTasks = newUserTasks.sort((curr, prev) => curr.title.length - prev.title.length);
            });

            return response;
            
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTask(taskId : String, token: String, userName: String){        
        try {
            const URL = `http://127.0.0.1:7000/task/delete/${taskId}`;
            const response = axios.delete(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => 
        {
            this.getAllUserTasks(userName, token)
        })

        return response;
        } catch (error) {
            console.log(error)
        }
    }

    setMessage(message: string){
        this.toastMessage = message
    }

    setCurrentPageItems(items : Item[]){
        this.currentPageItems = items;
    }

    authUser(){
        this.isUserAuth = true;
    }

    
    
}

configure({
    enforceActions: "never",
})

export const globalStore = new Store();