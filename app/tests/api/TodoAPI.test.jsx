var expect = require("expect");
var TodoAPI = require('TodoAPI');


describe('TodoAPI', ()=> {
  beforeEach(()=> {
    localStorage.removeItem('todos');
  });

  it('Should exist', ()=>{
    expect(TodoAPI).toExist();
  });

  describe("filterTodos", ()=>{

    var todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    },{
      id: 2,
      text: 'Other text here',
      completed: false
    },
    {
      id: 3,
      text: 'Some other text',
      completed: true
    }];

    it('Should return all items if showcompleted is true', ()=>{
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('Should return non completed todos when showcompleted is false', ()=>{
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('Should sort by completed status', ()=>{
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('Should filter todos by searchText', ()=>{
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(2);
    });

    it('Should return all todos if search text is empty', ()=>{
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

  });
});
