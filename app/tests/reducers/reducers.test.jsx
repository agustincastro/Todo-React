
var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', ()=> {
  describe('searchTextReducer', ()=>{

    it('Should set textSearch', ()=>{
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog'
      };
      var res = reducers.searchTextReducer(df(''), df(action));
      expect(res).toEqual(action.searchText);
    });

    describe('showCompletedReducer', () => {
      it('Should toggle show completed', ()=>{
        var action = {
          type: 'TOGGLE_SHOW_COMPLETED'
        };
        var res = reducers.showCompletedReducer(df(false), df(action));
        expect(res).toEqual(true);
      });

    });


    describe('todosReducer', () => {
      it('Should add new todo', ()=>{
        var action = {
          type: 'ADD_TODO',
          todo: {
            id: 'abc123',
            text: 'Something to do',
            completed: false,
            createdAt: 921312
          }
        };
        var res = reducers.todosReducer(df([]), df(action));
        expect(res.length).toEqual(1);
        expect(res[0]).toEqual(action.todo);

      });


      it('Should update todo', ()=>{
        var todos = [{
          id: '123',
          text: 'Something',
          completed: true,
          createdAt: 123,
          completedAt: 125
        }];
        var updates = {
          completed: false,
          completedAt: null
        };
        var action = {
          type: 'UPDATE_TODO',
          id: '123',
          id: todos[0].id,
          updates
        };
        var res = reducers.todosReducer(df(todos), df(action));
        expect(res[0].completed).toEqual(updates.completed);
        expect(res[0].completedAt).toEqual(updates.completedAt);
        expect(res[0].text).toEqual(todos[0].text);
      });

      it('Should add existing todos', ()=>{
        var todos = [{
          id: 111,
          text: 'anything',
          completed: false,
          completedAt:undefined,
          createdAt: 3300
        }];
        var action = {
          type: 'ADD_TODOS',
          todos
        };
        var res = reducers.todosReducer(df([]), df(action));
        expect(res.length).toEqual(1);
        expect(res[0]).toEqual(todos[0]);
      });

      it('Should whipe todos on logout', ()=>{
        var todos = [{
          id: 111,
          text: 'anything',
          completed: false,
          completedAt:undefined,
          createdAt: 3300
        }];
        var action = {
          type: 'LOGOUT'
        };
        var res = reducers.todosReducer(df(todos), df(action));
        expect(res.length).toEqual(0);
      });

    });



    describe('authReducer', ()=> {
      it('should store uid on LOGIN', ()=> {
        const action = {
          type:'LOGIN',
          uid: 'abc123'
        };
        const res = reducers.authReducer(undefined, df(action));
        expect(res).toEqual({
          uid: action.uid
        });
      });

      it('should wipr auth on LOGOUT', ()=> {
        const authData = {
          uid: '123abc'
        };
        const action = {
          type:'LOGOUT',
        };
        const res = reducers.authReducer(df(authData), df(action));
        expect(res).toEqual({});
      });

    });

  });
});
