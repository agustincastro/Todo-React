var expect = require('expect');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import firebase, {firebaseRef} from 'app/firebase/'
var actions = require('actions');

// we create a mock store, the function takes an array of middlewware as an argument
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('Should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);
    expect(res).toEqual(action);

  });

  it('Should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123abc',
        text: 'Anything you like',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addTodo(action.todo);
    expect(res).toEqual(action);
  });

  it('Should generate add todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My todo item';
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({type: 'ADD_TODO'});
      expect(actions[0].todo).toInclude({text: todoText});
      done();
    }).catch(done);
  });

  it('Should generate add todos action object', () => {
    var todos = [
      {
        id: 111,
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 3300
      }
    ];

    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var res = actions.addTodos(todos);
    expect(res).toEqual(action);

  });

  it('Should generate the show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);

  });

  it('Should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 5,
      updates: {
        completed: false
      }
    };
    var res = actions.updateTodo(action.id, action.updates);
    expect(res).toEqual(action);

  });

  describe('Tests with firebase todos', () => {

    var testTodoRef;

    //Before each is available inside of mocha and lets us define code to be run before every test
    beforeEach((done) => {
      var todosRef = firebaseRef.child('todos');
      todosRef.remove().then( ()=> {
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set(
          {text: 'Something to do',
          completed: false,
          createdAt: 123123})
        }).then(() => done()).catch(done);

      });

      //After each is available inside of mocha and lets us define code to be run after every test
      beforeEach((done) => {
        testTodoRef.remove().then(() => done());
      });

      it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
        const store = createMockStore({});
        const action = actions.startToggleTodo(testTodoRef.key, true);
        store.dispatch(action).then( () => {
          const mockActions = store.getActions();
          expect(mockActions[0]).toInclude({type: 'UPDATE_TODO', id: testTodoRef.key});
          expect(mockActions[0].updates).toInclude({completed: true});
          expect(mockActions[0].updates.completedAt).toExist();
          done();
        }, done );

      });

      it('should populate todos and dispatch ADD_TODOS', (done)=>{
        const store = createMockStore({});
        const action = actions.startAddTodos();

        store.dispatch(action).then(()=>{
          const mockActions = store.getActions();

          expect(mockActions[0].type).toEqual('ADD_TODOS');
          expect(mockActions[0].todos.length).toEqual(1);
          expect(mockActions[0].todos[0].text).toEqual('Something to do');
          done();

        }, done);


      });


    });

  });
