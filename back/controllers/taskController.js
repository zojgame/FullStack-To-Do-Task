const User = require('../models/User');
const Task = require('../models/Task');

class taskController{
    async createTask(req, res){
        try {
            const {title, isDone, description, deadline, username} = req.body            
            const user = await User.findOne({username: username})

            if(!user){
                return res.json({message: `Пользователь ${user.username} не найден`})
            }

            const task = new Task({ 
                owner: username, 
                deadline: deadline,
                title: title, 
                isDone: isDone, 
                description: description });
                await task.save();
            
            return res.status(200).json({message: `Задача ${task.title} успешно создана`})
        } catch (error) {
            console.log(error)
            return res.status(400).json({errorMessage: 'Невозможно создать задачу'})
        }        
    }

    async getAllTasks(req, res){
        try {
            const tasks = await Task.find();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(400).json({error: `${error}`})
        }        
    }

    async getCurrentTask(req, res){
        try {
            const task = await Task.findById(req.params.id);
            res.json({data: task})           
        } catch (error) {
            return res.status(400)  
            .json({ message: `Задачи не существует или ошибка параметров`, error: `${error}` });
        }
    }

    async deleteTask(req, res){
        try {
            await Task.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: 'Задача удалена'})
        } catch (error) {
            return res.status(404).json({message: 'message задача не найдена', error: `${error}`})
        }
    }   

    async updateTask(req, res){
        try {
            const task = await Task.findById(req.params.id);
            Object.assign(task, req.body);
            task.save();
            res.status(200).json({task: task})
        } catch (error) {
            res.status(400).json({message: 'Корзина не найдена'});
        }
        
    }

    async getUserTask(req, res){
        try {
            const userName = req.params.username;
            const task = (await Task.find())
            .filter(task => task.owner === userName)
            res.status(200).json(task)            
        } catch (error) {
            res.status(400).json({message: 'Пользователь не найден'})
            console.log(error)
        }
    }
    
    async getUserDoneTasks(req, res){
        try {
            const userName = req.params.username;
            const task = (await Task.find())
            .filter(task => task.owner === userName && task.isDone)
            res.status(200).json(task)            
        } catch (error) {
            res.status(400).json({message: 'Пользователь не найден'})
            console.log(error)
        }
    }

    async getUserNotCompletedTasks(req, res){
        try {
            const userName = req.params.username;
            const task = (await Task.find())
            .filter(task => task.owner === userName && !task.isDone)
            res.status(200).json(task)            
        } catch (error) {
            res.status(400).json({message: 'Пользователь не найден'})
            console.log(error)
        }
    }
}

module.exports = new taskController();