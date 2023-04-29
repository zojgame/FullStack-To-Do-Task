export interface Task {
    _id: String,
    title: String,
    isDone: Boolean,
    description: String,
    deadline: Date,
    owner: String,
    created: Date
}

export interface Item{
    price: String,
    title: String,
    _id?: String,
}