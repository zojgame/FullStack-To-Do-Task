export interface Task {
    _id: String,
    title: String,
    isDone: Boolean,
    description: String,
    deadline: Date,
    owner: String
}

export interface Item{
    price: String,
    title: String,
    _id?: String,
}