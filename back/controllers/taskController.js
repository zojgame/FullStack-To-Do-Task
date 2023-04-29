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

    async createItem(req, res){
        try {
            const {title, price} = req.body;
            const item = new Item({title: title, price: price})
            item.save()

            res.json({message: `Товар ${title} успешно создан`})
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }

    async getItems(req, res){
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }

    async deleteItem(req, res){
        const basketID = req.body.basketId;
        const itemID = new ObjectId(req.body.id);
        try {
            const currentBasket = await Basket.findById(basketID)           

            const currentItems = currentBasket.items.filter(item => item._id !== itemID)
            const newBasket = {...currentBasket, items: currentItems}
            Object.assign(currentBasket, newBasket);
            currentBasket.save();
            res.status(200).json({message: 'Товар успешно удалён'})
            
        } catch (error) {
            res.json({message: `Ошибка ${error}`})
        }
    }
}

module.exports = new taskController();