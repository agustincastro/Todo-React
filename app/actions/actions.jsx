import firebase, {firebaseRef} from 'app/firebase/index';
import moment from 'moment';
//Instead of mutating the state directly, you specify the mutations you want
//to happen with plain objects called actions. Then you write a special function
//called a reducer to decide how every action transforms the entire application's state.

export var setSearchText = (searchText) => {
  return{
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};


export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  };
};



export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};


export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
        text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);
    return todoRef.then( ()=> {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    })
  };
};


export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};
