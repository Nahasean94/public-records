import {ADD_TODO, CLEAR_TODOS, DELETE_TODO, UPDATE_TODO,} from "./types"
// import Todo from '../../build/contracts/Todo.json'
// import store from '../store'
//
// const contract = require('truffle-contract')

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export function clearTodos() {
    return {
        type: CLEAR_TODOS,
        payload: {}
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO,
        payload: todo
    }
}


export function deleteTodo(todoId) {
    return {
        type: DELETE_TODO,
        payload: {id: todoId}
    }
}
//
export function saveTodo(todo) {
//     console.log(1)
//     let web3 = store.getState().web3.web3Instance
//     console.log(web3)
//     if (typeof web3 !== 'undefined') {
//         console.log(2)
//         return dispatch => {
//             const todoObject = contract(Todo)
//             todoObject.setProvider(web3.currentProvider)
//             console.log(3)
//
//             let todoInstance
//             web3.eth.getCoinbase((error, coinbase) => {
//                 console.log(4)
//                 if (error) {
//                     console.log(error)
//                 }
//                 todoObject.deployed().then(instance => {
//                     console.log(5)
//                     todoInstance = instance
//                     todoInstance.addTodo(todo).then(result =>console.log(result))
//                 })
//             })
//
//
//         }
//     }
//     console.error('Web3 is not initialized.');
//
}
