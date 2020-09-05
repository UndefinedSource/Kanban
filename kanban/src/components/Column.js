import React from 'react';

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

        // Update the column that has added its new task
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
                        <textarea spellCheck="false" className="txtarea_task" defaultValue={task.text}></textarea>
                        <div>         
                            {(!this.props.isFirstCol) ?
                                <button className="btn-prevArrow" onClick={() => this.onClickMoveTaskToPrevCol(task)}>&#10094;</button>
                                : null             
                            }
                            <button className="btn-completeTask" onClick={() => this.onClickCompleteTask(task.id)}>&#10004;</button>
                            <button id={"btn-deleteTask"+task.id} className="btn-deleteTask" onClick={() => this.onClickDeleteTask(task.id)}>&#10006;</button>
                            {(!this.props.isLastCol) ?
                                <button className="btn-nextArrow" onClick={() => this.onClickMoveTaskToNextCol(task)}>&#10095;</button>
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
                <button className="btn-deleteColumn" onClick={this.props.onClickDeleteCol}>X</button>

                <textarea placeholder="Enter New Task"
                    spellCheck="false"
                    className="txtarea-newTask"
                    value={this.state.taskText} 
                    onChange={this.onChangeTaskInput.bind(this)}></textarea>
                <button className="btn-addTask" onClick={this.onClickAddTask.bind(this)}>Post Task</button>
                <ul>
                    {tasks}
                </ul>
            </div>
        )
    }

}

export default Column;