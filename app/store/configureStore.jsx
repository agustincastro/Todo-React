import * as redux from 'redux';
import thunk from 'redux-thunk';
import {searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    //with thunk we can have action generators that dont return objects, instead
    //they return functions were we can do async code.
    redux.applyMiddleware(thunk),
    //Adds support to redux developer tools
    window.devToolsExtension ? window.devToolsExtension(): f => f
  ));
  return store;
};
