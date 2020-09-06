import React from 'react';
import './App.css';
import Header from './components/Header';
import Column from './components/Column';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkMode: false,
    }
  }

  changeTheme() {
    this.setState({
      isDarkMode: this.state.isDarkMode ? false : true
    })
    
  }

  render() {
    return (
      <div className={this.state.isDarkMode? "app-darkMode" : "app"} >
        <Board changeTheme={() => this.changeTheme()}/>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      columnListArr: [],
      isDarkMode: false,
    }
  }

  onClickAddCol() {
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
    })
  }

  onClickDeleteCol(selectedCol_id) {
    // remove column with matching column ID  
    this.setState({
      columnListArr: this.state.columnListArr.filter((col) => {
        return col.id !== selectedCol_id;
      })
    })
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
        currentCol['tasks'].push({id: this.createNewId(currentCol['tasks']), text: text, completed_time: completed_time});
      }
      else {
        currentCol['tasks'].push({id: this.createNewId(currentCol['tasks']), text: text});
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
    })

  }

  addCompletedTimeToTask = (col_id, task_id) => {
    var col = this.getColumnById(col_id);
    var currentTime = new Date();

    var taskObj = col['tasks'].find((task) => {
      return task.id === task_id;
    });

    // create 'completed_time' key then store current time
    taskObj['completed_time'] = currentTime.toLocaleString();

    var taskChangedCol = col.tasks.map(task => {
      if (task.id === task_id) { return taskObj}
      else { return task };
    })

    // replace the array that has been changed
    this.setState({
      columnListArr: this.state.columnListArr.map(col => {
        if (col.id === taskChangedCol.id) {
          return taskChangedCol;
        }
        else return col;
      })
    })

  }

  deleteTask = (col_id, task_id) => {
    // find column by ID
    var col_found = this.getColumnById(col_id);

    // filter column's task array by removing matching task ID
    var filteredCol = col_found['tasks'].filter((task) => {
      return task.id !== task_id;
    })

    // replace column's tasks with filtered array of tasks
    col_found['tasks'] = filteredCol;

    // setState target column only
    this.setState({
      columnListArr: this.state.columnListArr.map((col) => {
        if (col.id === col_id) { return col_found }
        else { return col };
      })
    })
  }

  moveTaskToNextCol = (col_id, taskObj) => {
    this.deleteTask(col_id, taskObj.id);

    var currentColumnIndex = this.getColumnIndex_in_columnListArr(col_id);
    var nextCol = this.state.columnListArr[++currentColumnIndex];

    // if taskObj has completed_time key then trigger 'addTask' method with additional completed_time
    if ('completed_time' in taskObj) {
      this.addTask(nextCol.id, taskObj.text, taskObj.completed_time)
    }
    else {
      this.addTask(nextCol.id, taskObj.text)
    }
    
  }

  moveTaskToPrevCol = (col_id, taskObj) => {
    this.deleteTask(col_id, taskObj.id);

    var currentColumnIndex = this.getColumnIndex_in_columnListArr(col_id);
    var prevCol = this.state.columnListArr[--currentColumnIndex];

    // if taskObj has completed_time key then trigger 'addTask' method with additional completed_time
    if ('completed_time' in taskObj) {
      this.addTask(prevCol.id, taskObj.text, taskObj.completed_time)
    }
    else {
      this.addTask(prevCol.id, taskObj.text)
    }
  }

  getColumnIndex_in_columnListArr(col_id) {
    const columnIndex = this.state.columnListArr.findIndex(col => {
      // return matching column so it returns the column's index
      if (col.id === col_id) { return col; }
      else { return null; }
    });
    return columnIndex;
  } 

  createNewId(taskArr) {
    // return ++lastElementId < does not work, so duplicate id value in a new variable then increment by 1
    var lastElementId = taskArr[taskArr.length-1].id;
    var newId = lastElementId;
    return ++newId;
  }

  getColumnById(col_id) {
    // find the column with matching ID
    var col = this.state.columnListArr.find(col_in_columnListArr => col_in_columnListArr.id === col_id)
    return col;
  }

  onClickDarkMode() {
    this.props.changeTheme();
  }

  render() {
    var columns;
    var columnCount = -1;
      columns = this.state.columnListArr.map((column) => {
        columnCount++;
        return (
          <Column key={column.id} col_id={column.id} tasks={column.tasks}
          onClickDeleteCol={() => this.onClickDeleteCol(column.id)}
          addTask={this.addTask}
          moveTaskToNextCol={this.moveTaskToNextCol}
          moveTaskToPrevCol={this.moveTaskToPrevCol}
          deleteTask={this.deleteTask}
          addCompletedTimeToTask={this.addCompletedTimeToTask}
          isFirstCol={(columnCount === 0) ? true : false}
          isLastCol={(columnCount === this.state.columnListArr.length - 1) ? true : false}
          />
        )
      });

    const txtNoContent = (columns.length === 0) ?
        <h1 className="heading-noContent">Oops! No Board Columns<br/> Click the plus button above to create a column</h1>
        : null

    return (
    <div>
      <Header onClickAddCol={() => this.onClickAddCol()} onClickDarkMode={() => this.onClickDarkMode()}/>
      {txtNoContent}
      {columns} 
    </div>
    )
  }

}

export default App;
