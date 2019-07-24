
import Realm from 'realm'

export const TODOLIST_SCHEMA = "TodoList"
export const TODO_SCHEMA = "Todo"

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    }
}

export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA },
    }
}

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0
}

//functions for TodoLists
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA, newTodoList)
            resolve(newTodoList)
        })
    }).catch((error) => reject(error))
})

export const updateTodoList = todoList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id)
            updatingTodoList.name = todoList.name
            resolve()
        })
    }).catch((error) => reject(error))
})

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoList = realm.objects(TODOLIST_SCHEMA)
            realm.delete(allTodoList)
            resolve()
        })
    }).catch((error) => reject(error))
})

export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoList = realm.objects(TODOLIST_SCHEMA)
        resolve(allTodoList)
    }).catch((error) => reject(error))
})

export default new Realm(databaseOptions);
