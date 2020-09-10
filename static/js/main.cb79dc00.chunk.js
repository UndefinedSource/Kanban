(this.webpackJsonpkanban=this.webpackJsonpkanban||[]).push([[0],{14:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(6),l=a.n(o),i=(a(14),a(1)),r=a(2),c=a(4),m=a(3),u=a(7),d=function(e){return s.a.createElement("div",{className:"header"},s.a.createElement("input",{type:"text",spellCheck:"false",className:"txt-title",placeholder:"Enter Title"}),s.a.createElement("div",{className:"menu"},s.a.createElement("span",null),s.a.createElement("button",{className:"btn-addColumn",onClick:e.onClickAddCol},"+"),s.a.createElement("span",{className:"switch-container"},s.a.createElement("input",{type:"checkbox",className:"chk-darkMode",onClick:e.onClickDarkMode}),s.a.createElement("label",{htmlFor:"",className:"switch-on-text"},"Light"),s.a.createElement("label",{htmlFor:"",className:"switch-off-text"},"Dark"))))},k=a(20),T=function(e){var t=e.task.id;return s.a.createElement("div",null,s.a.createElement(k.a,{spellCheck:"false",className:"txtarea-task",defaultValue:e.task.text,onChange:function(a){e.changedTaskText(t,a.target.value)}}),s.a.createElement("div",null,e.isFirstCol?null:s.a.createElement("button",{className:"btn-prevArrow",onClick:function(){e.moveTaskToPrevCol(e.task)}},s.a.createElement("span",{className:"material-icons"})),s.a.createElement("button",{className:"btn-completeTask",onClick:function(){e.completeTask(t)}},s.a.createElement("span",{className:"material-icons"},"\ue5ca")),s.a.createElement("button",{id:"btn-deleteTask"+e.task.id,className:"btn-deleteTask",onClick:function(){e.deleteTask(t)}},s.a.createElement("span",{className:"material-icons"},"\ue872")),e.isLastCol?null:s.a.createElement("button",{className:"btn-nextArrow",onClick:function(){e.moveTaskToNextCol(e.task)}},s.a.createElement("span",{className:"material-icons"})),e.completed_time?s.a.createElement("p",{className:"p-completedTime"},"Completed: "+e.task.completed_time):null))},p=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).changedTaskText=function(e,t){n.props.editTaskText(n.state.id,e,t)},n.completeTask=function(e){n.props.addCompletedTimeToTask(n.state.id,e)},n.deleteTask=function(e){n.props.deleteTask(n.state.id,e)},n.moveTaskToNextCol=function(e){n.props.moveTaskToNextCol(n.state.id,e)},n.moveTaskToPrevCol=function(e){n.props.moveTaskToPrevCol(n.state.id,e)},n.state={id:n.props.col_id,newTaskText:""},n}return Object(r.a)(a,[{key:"onChangeNewTaskText",value:function(e){this.setState({newTaskText:e.target.value})}},{key:"onClickAddTask",value:function(){""!==this.state.newTaskText&&(this.props.addTask(this.state.id,this.state.newTaskText),this.setState({newTaskText:""}))}},{key:"render",value:function(){var e,t=this;return e=this.props.tasks?this.props.tasks.map((function(e){return s.a.createElement("div",{key:e.id},s.a.createElement("li",null,s.a.createElement(T,{task:e,isFirstCol:t.props.isFirstCol,isLastCol:t.props.isLastCol,completed_time:e.completed_time,changedTaskText:t.changedTaskText,deleteTask:t.deleteTask,completeTask:t.completeTask,moveTaskToPrevCol:t.moveTaskToPrevCol,moveTaskToNextCol:t.moveTaskToNextCol})))})):null,s.a.createElement("div",{className:"column"},s.a.createElement("input",{type:"text",className:"txt-columnName",placeholder:"Enter Column Name"}),s.a.createElement("button",{className:"btn-deleteColumn",onClick:this.props.onClickDeleteCol},s.a.createElement("span",{className:"material-icons"},"\ue872")),s.a.createElement(k.a,{rowsMin:1,spellCheck:"false",placeholder:"Enter New Task",className:"txtarea-newTask",value:this.state.newTaskText,onChange:this.onChangeNewTaskText.bind(this)}),s.a.createElement("button",{className:"btn-addTask",onClick:this.onClickAddTask.bind(this)},"Post Task"),s.a.createElement("ul",null,e))}}]),a}(s.a.Component),h=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).addCompletedTimeToTask=function(e,t){var a=n.getColumnById(e),s=new Date,o=a.tasks.find((function(e){return e.id===t}));o.completed_time=s.toLocaleString();var l=a.tasks.map((function(e){return e.id===t?o:e}));n.setState({columnListArr:n.state.columnListArr.map((function(e){return e.id===l.id?l:e}))})},n.addTask=function(e,t,a){var s=n.getColumnById(e);0===s.tasks.length?s.tasks=null!==a?[{id:0,text:t,completed_time:a}]:[{id:0,text:t,completed_time:""}]:a?s.tasks.push({id:n.createNewTaskId(s.tasks),text:t,completed_time:a}):s.tasks.push({id:n.createNewTaskId(s.tasks),text:t}),n.setState({columnListArr:n.state.columnListArr.map((function(e){return e.id===s.id?s:e}))})},n.deleteTask=function(e,t){var a=n.getColumnById(e),s=a.tasks.filter((function(e){return e.id!==t}));a.tasks=s,n.setState({columnListArr:n.state.columnListArr.map((function(t){return t.id===e?a:t}))})},n.editTaskText=function(e,t,a){var s=n.state.columnListArr;s.forEach((function(n){n.id===e&&n.tasks.forEach((function(e){e.id===t&&(e.text=a)}))})),n.setState({columnListArr:s})},n.moveTaskToNextCol=function(e,t){n.deleteTask(e,t.id);var a=n.getColumnIndex_in_columnListArr(e),s=n.state.columnListArr[++a];"completed_time"in t?n.addTask(s.id,t.text,t.completed_time):n.addTask(s.id,t.text)},n.moveTaskToPrevCol=function(e,t){n.deleteTask(e,t.id);var a=n.getColumnIndex_in_columnListArr(e),s=n.state.columnListArr[--a];"completed_time"in t?n.addTask(s.id,t.text,t.completed_time):n.addTask(s.id,t.text)},n.state={columnListArr:[]},n}return Object(r.a)(a,[{key:"createNewTaskId",value:function(e){var t=e[e.length-1].id;return++t}},{key:"getColumnById",value:function(e){return this.state.columnListArr.find((function(t){return t.id===e}))}},{key:"getColumnIndex_in_columnListArr",value:function(e){return this.state.columnListArr.findIndex((function(t){return t.id===e}))}},{key:"onClickAddCol",value:function(){var e,t=this.state.columnListArr;e=0===t.length?{id:0,tasks:[]}:{id:t[t.length-1].id+1,tasks:[]},this.setState({columnListArr:[].concat(Object(u.a)(this.state.columnListArr),[e])})}},{key:"onClickDarkMode",value:function(){this.props.changeTheme()}},{key:"onClickDeleteCol",value:function(e){this.setState({columnListArr:this.state.columnListArr.filter((function(t){return t.id!==e}))})}},{key:"render",value:function(){var e,t=this,a=-1,n=0===(e=this.state.columnListArr.map((function(e){return a++,s.a.createElement(p,{col_id:e.id,key:e.id,tasks:e.tasks,addCompletedTimeToTask:t.addCompletedTimeToTask,addTask:t.addTask,deleteTask:t.deleteTask,editTaskText:t.editTaskText,isFirstCol:0===a,isLastCol:a===t.state.columnListArr.length-1,moveTaskToNextCol:t.moveTaskToNextCol,moveTaskToPrevCol:t.moveTaskToPrevCol,onClickDeleteCol:function(){return t.onClickDeleteCol(e.id)}})}))).length?s.a.createElement("h1",{className:"heading-noContent"},"Oops! No Board Columns",s.a.createElement("br",null),"Click the plus button above to create a column"):null;return s.a.createElement("div",null,s.a.createElement(d,{onClickAddCol:function(){return t.onClickAddCol()},onClickDarkMode:function(){return t.onClickDarkMode()}}),n,e)}}]),a}(s.a.Component),C=(a(18),function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={isDarkMode:!1},n}return Object(r.a)(a,[{key:"changeTheme",value:function(){this.setState({isDarkMode:!this.state.isDarkMode})}},{key:"componentDidMount",value:function(){window.onbeforeunload=function(e){return e.returnValue="",""}}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:this.state.isDarkMode?"app-darkMode":"app"},s.a.createElement(h,{changeTheme:function(){return e.changeTheme()}}))}}]),a}(s.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){e.exports=a(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.cb79dc00.chunk.js.map