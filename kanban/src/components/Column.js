import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.col_id,
            taskText: ""
        }
    }

    onClickAddTask() {
        if (this.state.taskText === "") return;
        this.props.addTask(this.state.id, this.state.taskText);

        // Update the column that has added a new task in it
        this.setState({
            taskText: ""
        })
    }

    onChangeTaskInput(e) {
        console.log(e.target.value);
        this.setState({
            taskText: e.target.value
        })
    }

    onClickDeleteTask(task_id) {
        this.props.deleteTask(this.state.id, task_id);
    }

    onClickCompleteTask(task_id) {
        this.props.addCompletedTimeToTask(this.state.id, task_id);
    }

    onClickMoveTaskToNextCol(taskObj) {
        this.props.moveTaskToNextCol(this.state.id, taskObj);
    }

    onClickMoveTaskToPrevCol(taskObj) {
        this.props.moveTaskToPrevCol(this.state.id, taskObj);
    }

    render() {
        var tasks;
        if (this.props.tasks) {
             tasks = this.props.tasks.map(task => {
                return (
                    <div key={task.id}>
                    <li>
                        <TextareaAutosize draggable="true" spellCheck="false" className="txtarea-task" defaultValue={task.text}/>
                        <div>         
                            {(!this.props.isFirstCol) ?
                                <button className="btn-prevArrow" onClick={() => this.onClickMoveTaskToPrevCol(task)}>
                                    <span className="material-icons"></span>
                                </button>
                                : null             
                            }
                            <button className="btn-completeTask" onClick={() => this.onClickCompleteTask(task.id)}><span className="material-icons">&#xe5ca;</span></button>
                            <button id={"btn-deleteTask"+task.id} className="btn-deleteTask" onClick={() => this.onClickDeleteTask(task.id)}><span className="material-icons">&#xe872;</span></button>
                            {(!this.props.isLastCol) ?
                                <button className="btn-nextArrow" onClick={() => this.onClickMoveTaskToNextCol(task)}>
                                    <span className="material-icons"></span>
                                </button>
                                : null
                            }
                            {(task.completed_time) ?
                                <p className="p-completedTime">{'Completed: ' + task.completed_time}</p>
                                : null
                            }
                            
                        </div>
                    </li>
                    </div>
                )      
            });
        }

        else {
            tasks = null
        }
        
        return (
            <div className="column">         
                <input type="text" className="txt-columnName" placeholder="Enter Column Name" />
                <button className="btn-deleteColumn" onClick={this.props.onClickDeleteCol}><span className="material-icons">&#xe872;</span></button>
                <TextareaAutosize rowsMin={1}
                    spellCheck="false"
                    placeholder="Enter New Task"
                    className="txtarea-newTask"
                    value={this.state.taskText} 
                    onChange={this.onChangeTaskInput.bind(this)}
                />
                <button className="btn-addTask" onClick={this.onClickAddTask.bind(this)}>Post Task</button>
                <ul>
                    {tasks}
                </ul>
            </div>
        )
    }

}

export default Column;