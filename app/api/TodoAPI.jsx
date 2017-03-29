var $ = require('jquery')

module.exports = {

  filterTodos: function(todos, showCompleted, searchText){
    var filteredTodos = todos;

    //Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo)=>{
      return !todo.completed || showCompleted;
    });

    //Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      return searchText.length === 0 || todo.text.toLowerCase().indexOf(searchText) > -1;
    });

    //Sort non completed todos first
    filteredTodos.sort((a, b) => {
      if( !a.completed && b.completed){
        return -1;
      }else if( a.completed && !b.completed){
        return 1
      }else{
        return 0;
      }
    });

    return filteredTodos;
  }

};
