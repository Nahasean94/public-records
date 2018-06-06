import {ADD_TODO, CLEAR_TODOS, DELETE_TODO, UPDATE_TODO, } from "../actions/types"

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload]
        case CLEAR_TODOS:

            return []
        case UPDATE_TODO:
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload
                }
                return todo
            })
        case DELETE_TODO:
            return state.filter((todo)=>todo.id !== action.payload.id);
        default:
            return state
    }
}
