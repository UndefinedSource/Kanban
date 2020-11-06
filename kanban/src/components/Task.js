import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const Task = (props) => {
    const task_id = props.task.id;

    function onChangeTaskText(e){
        props.changedTaskText(task_id, e.target.value);
    }

    function onClickCompleteTask() {
        props.completeTask(task_id);
    }

    function onClickDeleteTask() {
        props.deleteTask(task_id);
    }

    function onClickMoveTaskToNextCol() {
        props.moveTaskToNextCol(props.task);
    }

    function onClickMoveTaskToPrevCol() {
        props.moveTaskToPrevCol(props.task);
    }

    return (
        <div>
            <TextareaAutosize spellCheck="false" className="txtarea-task"
                    defaultValue={props.task.text}
                    onChange={onChangeTaskText}>
            </TextareaAutosize>
            
            <div>         
                {(!props.isFirstCol) ?
                    <button className="btn-prevArrow" onClick={onClickMoveTaskToPrevCol}>
                        <span className="material-icons"></span>
                    </button>
                    : null             
                }
                <button className="btn-completeTask" onClick={onClickCompleteTask}>
                    <span className="material-icons">&#xe5ca;</span>
                </button>
                <button id={"btn-deleteTask"+ props.task.id} className="btn-deleteTask" onClick={onClickDeleteTask}>
                    <span className="material-icons">&#xe872;</span>
                </button>
                {(!props.isLastCol) ?
                    <button className="btn-nextArrow" onClick={onClickMoveTaskToNextCol}>
                        <span className="material-icons"></span>
                    </button>
                    : null
                }
                {(props.completed_time) ?
                    <p className="p-completedTime">{'Completed: ' + props.task.completed_time}</p>
                    : null
                }
            </div>
        </div>
    )
}

export default React.memo(Task);