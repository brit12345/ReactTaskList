import { ChangeEvent, useContext, useState } from "react";
import { MyContext } from "./MyContext";
import LabelComponent from "./Label";
import DeleteButton from "./DeleteButton";
import CancelButton from "./CancelButton";
import Task from "../data/dataInterfaces";
import { priorityWords } from "../data/priorityWords";

function Detail(){
  const { tasks, detailID, setTasks } = useContext(MyContext);
  const [focusTask, setFocusTask] = useState(tasks.filter(task => task.id === detailID)[0]);

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {

    setFocusTask({ //update the focus for the detail page
      ...focusTask,
      completed: e.target.checked
    });

    const taskList: Array<Task> = tasks.map(task => {
      if(task.id === focusTask.id){
        return { //setFocusTask won't be updated by here, so insert the new change
          ...focusTask,
          completed: e.target.checked
        };
      } else {
        return task;
      }
    });

    setTasks(taskList);
  }

  let word: string = "Medium";
  if(priorityWords[focusTask.priority.toString() as keyof typeof priorityWords]){
    word = priorityWords[focusTask.priority.toString() as keyof typeof priorityWords];
  }
  
  return (
    <div>
      <div className="fullWidth">
        <h3>Title</h3>
        <p>{focusTask.title}</p>
      </div>
     
      <div className="fullWidth">
        <h3>Description</h3>
        <p>{focusTask.desc}</p>
      </div>

      <div className="fullWidth">
        <h3>Due Date</h3>
        <p>{(new Date(focusTask.dueDate)).toLocaleString('en-AU', {hour12: true, dateStyle: "short", timeStyle: "short"})}</p>
      </div>

      <div className="fullWidth">
        <h3>Reminder</h3>
        <p>{(new Date(focusTask.reminder)).toLocaleString('en-AU', {hour12: true, dateStyle: "short", timeStyle: "short"})}</p>
      </div>

      <div className="fullWidth">
        <h3>Priority</h3>
        <p>{word}</p>
      </div>

      <div>
        <h3>Labels</h3>
        {focusTask.labels.map(label => {
        return (
          <LabelComponent label={label} key={label.id}></LabelComponent>
        )
      })}</div>

      <div>
        <label htmlFor="completed">Completed</label>
        <input type="checkbox" id="completed" checked={focusTask.completed} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleCheckboxChange(e)}}/>
      </div>

      <div id="formButtons">
        <div>
          <DeleteButton taskID={detailID} alteredTasks={null} setAlteredTasks={null}></DeleteButton>
        </div>
        <div>
          <CancelButton label="Back"></CancelButton>
        </div>
      </div>
    </div>
  );
}

export default Detail;