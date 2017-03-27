

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


export var addTodo = (searchText) => {
  return {
    type: 'ADD_TODO',
    searchText
  };
};
