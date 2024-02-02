import { ChangeEvent, useContext, useState } from "react";
import Task from "../data/dataInterfaces";
import { MyContext } from "./MyContext";
import { randomUUID } from "crypto";
import CancelButton from "./CancelButton";

function Add(){
  const { tasks, setTasks, detailID } = useContext(MyContext);
  const editMode = detailID !== null ? true : false;
  const task = {
    id: crypto.randomUUID(),
    title: "",
    desc: "",
    completed: false,
    dueDate: "",
    priority: "",
    labels: [],
    reminder: ""
  }

  const [formInputs, setFormInputs] = useState(task);


  function handleChange(e: ChangeEvent<HTMLInputElement>, property: string) {
    let tempTask = {
      ...task,
      [property]: e.target.value
    }
    console.log(e.target.value);
    setFormInputs(tempTask);
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>, property: string) {
    let tempTask = {
      ...task,
      [property]: e.target.value
    }
    console.log(e.target.value);
    setFormInputs(tempTask);
  }

  function getUniqueLabels(tasks: Array<Task>): Array<string> {
    let labels: Array<string> = [];

    tasks.map(task => {
      task.labels.map(label => labels.push(label.name));
    });
    return [...new Set(labels)];
  }

  return (
    <form>
      <div className="fullWidth">
        <label htmlFor="title">Title</label>
        <input type="text" className="nextLine" id="title" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}/>
      </div>
     
      <div className="fullWidth">
        <label htmlFor="desc">Description</label>
        <input type="text" className="nextLine" id="desc" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}/>
      </div>

      <div className="inputSpacing">
        <label htmlFor="dueDate">Due Date</label>
        <input type="datetime-local" id="dueDate" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}/>
      </div>
    
      <div className="inputSpacing">
        <label htmlFor="priority">Priority</label>
        <select id="priority" onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleSelectChange(e, "title")}}>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </select>
      </div>

      <div className="inputSpacing">
        <label>Label</label>
        <input type="text" list="labels" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}></input>
        <datalist id="labels">
          {getUniqueLabels(tasks).map(label => <option key={label}>{label}</option> )}
        </datalist>
      </div>

      <div id="formButtons">
        <div>
        </div>
        <div>
          <CancelButton></CancelButton>
          <button>save</button>
        </div>
      </div>
      
    </form>
  )
}

export default Add;

/*<input type="text" list="cars" />
<datalist id="cars">
  <option>Volvo</option>
  <option>Saab</option>
  <option>Mercedes</option>
  <option>Audi</option>
</datalist>

also need to add the delete button but only if its in edit?
*/