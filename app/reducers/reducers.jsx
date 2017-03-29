var uuid = require('node-uuid');
var moment = require('moment');
//Now that we've decided what our state object looks like, we're ready to write
//a reducer for it. The reducer is a pure function that takes the previous state
//and an action, and returns the next state.

export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    };
};

export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    };
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                action.todo
            ];
        case 'UPDATE_TODO':
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                        ...action.updates
                    };
                } else {
                    return todo;
                }
            });
        case 'ADD_TODOS':
            return [
                ...state,
                ...action.todos
            ];
        default:
            return state;
    }
}
