import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Task from './Task';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Column extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.col_id
        }
        this.newTaskTextRef = React.createRef();
    }

    onClickAddTask() {
        var newTaskText = this.newTaskTextRef.current.value;

        // check textarea newTaskText value if it has no value
        if (newTaskText === "") return;

        this.props.addTask(this.state.id, newTaskText);

        // must reference actual 'newTaskTextRef' variable to reset its value
        this.newTaskTextRef.current.value = "";
    }

    changedTaskText = (task_id, editedTaskText) => {
        this.props.editTaskText(this.state.id, task_id, editedTaskText);
    }

    completeTask = (task_id) => {
        this.props.addCompletedTimeToTask(this.state.id, task_id);
    }

    deleteTask = (task_id) => {
        this.props.deleteTask(this.state.id, task_id);
    }

    moveTaskToNextCol = (taskObj) => {
        this.props.moveTaskToNextCol(this.state.id, taskObj);
    }

    moveTaskToPrevCol = (taskObj) => {
        this.props.moveTaskToPrevCol(this.state.id, taskObj);
    }

    render() {
        var tasks;
        if (this.props.tasks) {
             tasks = this.props.tasks.map(task => {
                return (
                    <CSSTransition key={task.id} in={true} timeout={500} classNames="task-animation" appear={true}>
                    <li>
                        <Task task={task}
                        isFirstCol={this.props.isFirstCol}
                        isLastCol={this.props.isLastCol}
                        completed_time={task.completed_time}
                        changedTaskText={this.changedTaskText}
                        deleteTask={this.deleteTask}
                        completeTask={this.completeTask}
                        moveTaskToPrevCol={this.moveTaskToPrevCol}
                        moveTaskToNextCol={this.moveTaskToNextCol}> 
                        </Task>
                    </li>
                    </CSSTransition>
                )
            });
        }

        else { tasks = null }
        
        return (
            <div className="column">         
                <input type="text" className="txt-columnName" placeholder="Enter Column Name" />
                <button className="btn-deleteColumn" onClick={this.props.onClickDeleteCol}>
                    <span className="material-icons">&#xe872;</span>
                </button>
                <TextareaAutosize rowsMin={1}
                    spellCheck="false"
                    placeholder="Enter New Task"
                    className="txtarea-newTask"
                    defaultValue=""
                    ref={this.newTaskTextRef}>
                </TextareaAutosize>
                <button className="btn-addTask" onClick={this.onClickAddTask.bind(this)}>Post Task</button>
                <ul>
                    <TransitionGroup>{tasks}</TransitionGroup>
                </ul>
            </div>
        )
    }

}

export default React.memo(Column);