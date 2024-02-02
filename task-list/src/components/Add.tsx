import { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from "react";
import Task from "../data/dataInterfaces";
import { MyContext } from "./MyContext";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";
import { pages } from "../data/pages";

function Add(){
  const { tasks, setTasks, setCurrentPage } = useContext(MyContext);
  
  const task = {
    id: crypto.randomUUID(),
    title: "",
    desc: "",
    completed: false,
    dueDate: "",
    priority: "1",
    labels: "",
    reminder: ""
  }

  const [formInputs, setFormInputs] = useState(task);




  function handleChange(e: ChangeEvent<HTMLInputElement>, property: string) {
    let tempTask = {
      ...formInputs,
      [property]: e.target.value
    }

    setFormInputs(tempTask);
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>, property: string) {
    let tempTask = {
      ...formInputs,
      [property]: e.target.value
    }
    setFormInputs(tempTask);
  }

  function getUniqueLabels(tasks: Array<Task>): Array<string> {
    let labels: Array<string> = [];

    tasks.map(task => {
      task.labels.map(label => labels.push(label.name));
    });
    return [...new Set(labels)];
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    //to submit, i need to save it to the end of the tasks state
    const tempTask: Task = {
      ...formInputs,
      priority: Number(formInputs.priority),
      labels: [{
        id: crypto.randomUUID(),
        name: formInputs.labels,
        colour: "red"
      }]
    };
    e.preventDefault();
    const taskList: Array<Task> = [...tasks, tempTask]
    setTasks(taskList);
    setCurrentPage(pages.table);

  }

  function handleAddClick(e: MouseEvent<HTMLButtonElement>){
    console.log("clicking")
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fullWidth">
        <label htmlFor="title">Title</label>
        <input type="text" className="nextLine" id="title" value={formInputs.title} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}/>
      </div>
     
      <div className="fullWidth">
        <label htmlFor="desc">Description</label>
        <input type="text" className="nextLine" id="desc" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "desc")}}/>
      </div>

      <div className="inputSpacing">
        <label htmlFor="dueDate">Due Date</label>
        <input type="datetime-local" id="dueDate" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "dueDate")}}/>
      </div>

      <div className="inputSpacing">
        <label htmlFor="reminder">Reminder</label>
        <input type="datetime-local" id="reminder" onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "reminder")}}/>
      </div>
    
      <div className="inputSpacing">
        <label htmlFor="priority">Priority</label>
        <select id="priority" onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleSelectChange(e, "priority")}}>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </select>
      </div>

      <div className="inputSpacing">
        <label>Label</label>
        <input type="text" list="labels" value={formInputs.labels} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "labels")}}></input>
        <datalist id="labels">
          {getUniqueLabels(tasks).map(label => <option key={label} value={label}>{label}</option> )}
        </datalist>
        <button className="saveButton addButton" onClick={handleAddClick}>Add</button>
      </div>

      <div id="formButtons">
        <div>
        </div>
        <div>
          <CancelButton label="Cancel"></CancelButton>
          <SaveButton></SaveButton>
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