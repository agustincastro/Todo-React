var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var moment = require('moment');

export class Todo extends React.Component{

  render(){
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;
      if(completed){
        message = 'Completed ';
        timestamp = completedAt;
      }
      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
    };

    return(
      <div className={todoClassName} onClick={ () => {
          dispatch(actions.startToggleTodo(id, !completed));
        }}>
        <div>
          <input type='Checkbox' checked={completed} />
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }

};


// When we call connect, we hace access to the dispatch variable in the props
export default connect()(Todo);
