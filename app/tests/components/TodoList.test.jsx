var React  = require("react");
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', ()=>{
  it('should exist', ()=> {
    expect(TodoList).toExist();
  });

  it('should render on todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: 'Do something'
      },
      {
        id: 2,
        text: 'Check mail'
      }
    ];

    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    //scryRenderedComponentsWithType lets us check how many of a given components are rendered under another component
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    expect(todosComponents.length).toBe(todos.length);
  });


  it('should render empty message if there are no todods', () => {
    var todos = [];

    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var $el = $(ReactDOM.findDOMNode(todoList));
    expect($el.find('.container__message').length).toBe(1);
  });


});
