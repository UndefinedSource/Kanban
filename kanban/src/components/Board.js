import React from 'react';
import Header from './Header';
import Column from './Column';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Board extends React.Component {
    constructor(props) {
      super();
      
      this.state = {
        columnListArr: []
      }
    }

    // use arrow function to access state and class methods
    addCompletedTimeToTask = (col_id, task_id) => {
        var col = this.getColumnById(col_id);
        var currentTime = new Date();
    
        var taskObj = col['tasks'].find(task => task.id === task_id);
    
        // create 'completed_time' key then store current time
        taskObj['completed_time'] = currentTime.toLocaleString();
    
        var taskChangedCol = col.tasks.map(task => {
          if (task.id === task_id) { return taskObj}
          else { return task };
        });
    
        // replace the array that has been changed
        this.setState({
          columnListArr: this.state.columnListArr.map(col => {
            if (col.id === taskChangedCol.id) {
              return taskChangedCol;
            }
            else return col;
          })
        });
    }

    addTask = (col_id, text, completed_time) => {
        var currentCol = this.getColumnById(col_id);
    
        if (currentCol['tasks'].length === 0) {
            if (completed_time !== null) {
            currentCol['tasks'] = [{id: 0, text: text, completed_time: completed_time}];
            }
            else {
            currentCol['tasks'] = [{id: 0, text: text, completed_time: ""}];
            }
        }
        
        else {
            if (completed_time) {
            currentCol['tasks'].push({id: this.createNewTaskId(currentCol['tasks']), text: text, completed_time: completed_time});
            }
            else {
            currentCol['tasks'].push({id: this.createNewTaskId(currentCol['tasks']), text: text});
            }
        }
    
        // replace the array that has been changed
        this.setState({
            columnListArr: this.state.columnListArr.map(col => {
            if (col.id === currentCol.id) {
                return currentCol;
            }
            else {return col};
            })
        });
    }

    createNewTaskId(taskArr) {
        // return ++lastElementId < does not work, so duplicate id value in a new variable then increment by 1
        var lastElementId = taskArr[taskArr.length-1].id;
        var newId = lastElementId;
        return ++newId;
    }

    deleteTask = (col_id, task_id) => {
        // find column by ID
        var col_found = this.getColumnById(col_id);
    
        // filter column's task array by removing matching task ID
        var filteredCol = col_found['tasks'].filter(task => task.id !== task_id);
    
        // replace column's tasks with filtered array of tasks
        col_found['tasks'] = filteredCol;
    
        // setState target column only
        this.setState({
          columnListArr: this.state.columnListArr.map((col) => {
            if (col.id === col_id) { return col_found }
            else { return col };
          })
        });
    }

    editTaskText = (col_id, task_id, editedTaskText) => {
        var editedColumnListArr = this.state.columnListArr;

        // find task by its parent(column) ID and then its ID, then change its text to new text.
        editedColumnListArr.forEach(col => {
            if (col.id === col_id) {
                col.tasks.forEach(task => {
                    if (task.id === task_id) { task.text = editedTaskText; }
                })
            }
        });

        this.setState({
            columnListArr: editedColumnListArr
        });
    }

    getColumnById(col_id) {
        // find the column with matching ID
        var col = this.state.columnListArr.find(col_in_columnListArr => col_in_columnListArr.id === col_id)
        return col;
    }

    getColumnIndex_in_columnListArr(col_id) {
      // find column with matching col_id in columnListArr then return its index
      const columnIndex = this.state.columnListArr.findIndex(col => (col.id === col_id));
      return columnIndex;
    }
  
    moveTaskToNextCol = (col_id, taskObj) => {
        this.deleteTask(col_id, taskObj.id);
    
        var currentColumnIndex = this.getColumnIndex_in_columnListArr(col_id);
        var nextCol = this.state.columnListArr[++currentColumnIndex];
    
        // if taskObj has completed_time key then trigger 'addTask' method with additional completed_time
        if ('completed_time' in taskObj) {
          this.addTask(nextCol.id, taskObj.text, taskObj.completed_time);
        }
        else {
          this.addTask(nextCol.id, taskObj.text);
        }
    }
    
    moveTaskToPrevCol = (col_id, taskObj) => {
        this.deleteTask(col_id, taskObj.id);

        var currentColumnIndex = this.getColumnIndex_in_columnListArr(col_id);
        var prevCol = this.state.columnListArr[--currentColumnIndex];

        // if taskObj has completed_time key then trigger 'addTask' method with additional completed_time
        if ('completed_time' in taskObj) {
            this.addTask(prevCol.id, taskObj.text, taskObj.completed_time);
        }
        else {
            this.addTask(prevCol.id, taskObj.text);
        }
    }
  
    addColOnClickHandler() {
      var currentList = this.state.columnListArr;
      var newCol;
      
      if (currentList.length === 0) {
        newCol = {id: 0, tasks: []}
      }
      else {
        newCol = {id: currentList[currentList.length-1].id + 1, tasks: []}
      }
      
      this.setState({
        columnListArr: [...this.state.columnListArr, newCol]
      });
    }

    darkModeOnClickHandler() {
        this.props.changeTheme();
    }
  
    deleteColOnClickHandler(selectedCol_id) {
      // remove column with matching column ID  
      this.setState({
        columnListArr: this.state.columnListArr.filter(col => col.id !== selectedCol_id)
      });
    }
  
    render() {
      var columns;
      // count column to determine first and last columns and
      // show move-task-nextCol or move-task=prevCol or both buttons to tasks which 
      // are in columns that have adjacent columns
      var columnCount = -1;
        columns = this.state.columnListArr.map((column) => {
          columnCount++;
          return (
            <CSSTransition key={column.id} in={true} timeout={500} classNames="column-animation" appear={true}>
              <Column col_id={column.id} tasks={column.tasks}
              addCompletedTimeToTask={this.addCompletedTimeToTask}
              addTask={this.addTask}
              deleteTask={this.deleteTask}
              editTaskText={this.editTaskText}
              isFirstCol={(columnCount === 0) ? true : false}
              isLastCol={(columnCount === this.state.columnListArr.length - 1) ? true : false}
              moveTaskToNextCol={this.moveTaskToNextCol}
              moveTaskToPrevCol={this.moveTaskToPrevCol}
              onClickDeleteCol={() => this.deleteColOnClickHandler(column.id)}>
              </Column>
            </CSSTransition>
          )
        });
  
      const heading_noContent = (columns.length === 0) ?
          <CSSTransition in={true} timeout={{enter: 500, exit: 0}} classNames="heading-noContent-animation" appear={true}>
            <h1 className="heading-noContent">Oops! No Board Columns<br/>Click the plus button above to create a column</h1>
          </CSSTransition>
          : null
  
      return (
      <div>
        <Header onClickAddCol={() => this.addColOnClickHandler()} onClickDarkMode={() => this.darkModeOnClickHandler()}/>
        <TransitionGroup>
          {heading_noContent}
          {columns}
       </TransitionGroup>
      </div>
      );
    }
  }
  
  export default Board;