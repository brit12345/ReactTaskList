import { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from "react";
import Task, { Label } from "../data/dataInterfaces";
import { MyContext } from "./MyContext";
import CancelButton from "./CancelButton";
import SaveButton from "./SaveButton";
import { pages } from "../data/pages";
import DeleteButton from "./DeleteButton";
import LabelComponent from "./Label";
import { labelColours } from "../data/labelColours";

function Edit(){
  const { tasks, setTasks, detailID, setCurrentPage } = useContext(MyContext);

  const focusTask = tasks.filter(task => task.id === detailID)[0];
  
  const [formInputs, setFormInputs] = useState(focusTask);

  const [labelInput, setLabelInput] = useState("");

  const [labels, setLabels] = useState<Array<Label>>(focusTask.labels);

  const [colour, setColour] = useState("");

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
    e.preventDefault();

    const taskList: Array<Task> = tasks.map(task => {
      if(task.id === formInputs.id){
        return {
          ...formInputs,
          labels: labels
        };
      } else {
        return task;
      }
    });

    setTasks(taskList);
    setCurrentPage(pages.table);

  }

  function handleLabelChange(e: ChangeEvent<HTMLInputElement>) {
    setLabelInput(e.target.value);
  }

  function handleAddClick(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    let tempLabels = [
      ...labels,
      {
        id: crypto.randomUUID(),
        name: labelInput, //set it as whats currently in the input
        colour: colour
      }
    ]
    //somehow have to also get the colour

    setLabels(tempLabels);
  }

  function handleLabelDelete(e: MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const labelName = e.currentTarget.previousElementSibling?.textContent;
    let tempLabels = labels.filter(label => {
      if(label.name !== labelName){
        return label; //only return labels that aren't being deleted
      }
    });

    setLabels(tempLabels);
  }

  function handleColourChange(e: ChangeEvent<HTMLSelectElement>) {
    setColour(e.target.value);
  }

  function getColourOptions(): Array<React.ReactNode>{
    let options = [];
    for(const k in labelColours){
      const val = labelColours[k as keyof typeof labelColours];
      options.push(<option key={val} value={k}>{k[0].toUpperCase() + k.slice(1)}</option>);
    }
    return options;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fullWidth">
        <label htmlFor="title">Title</label>
        <input type="text" className="nextLine" id="title" value={formInputs.title} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "title")}}/>
      </div>
     
      <div className="fullWidth">
        <label htmlFor="desc">Description</label>
        <input type="text" className="nextLine" id="desc" value={formInputs.desc} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "desc")}}/>
      </div>

      <div className="inputSpacing">
        <label htmlFor="dueDate">Due Date</label>
        <input type="datetime-local" id="dueDate" defaultValue={formInputs.dueDate} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "dueDate")}}/>
      </div>

      <div className="inputSpacing">
        <label htmlFor="reminder">Reminder</label>
        <input type="datetime-local" id="reminder" defaultValue={formInputs.reminder} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "reminder")}}/>
      </div>
    
      <div className="inputSpacing">
        <label htmlFor="priority">Priority</label>
        <select id="priority" value={formInputs.priority} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleSelectChange(e, "priority")}}>
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </select>
      </div>

      <div className="inputSpacing">
        <label>Labels</label>
        {labels.map(label => <LabelComponent key={label.id} label={label} editMode={true}  onClick={handleLabelDelete}></LabelComponent>)}
        <input type="text" list="labels" value={labelInput} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleLabelChange(e)}}></input>
        <datalist id="labels">
          {getUniqueLabels(tasks).map(label => <option key={label} value={label}>{label}</option> )}
        </datalist>
        <div>
          <label>Colour</label>
            <select id="labels" onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleColourChange(e)}}>
              {getColourOptions()}
            </select>
        </div>
        <button className="saveButton addButton" onClick={handleAddClick}>Add</button>
      </div>

      <div>
        <label htmlFor="completed">Completed</label>
        <input type="checkbox" id="completed" checked={formInputs.completed} onChange={(e: ChangeEvent<HTMLInputElement>) => {handleChange(e, "completed")}}/>
      </div>

      <div id="formButtons">
        <div>
          <DeleteButton taskID={detailID} alteredTasks={null} setAlteredTasks={null}></DeleteButton>
        </div>
        <div>
          <CancelButton label="Cancel"></CancelButton>
          <SaveButton></SaveButton>
        </div>
      </div>
      
    </form>
  )
}

export default Edit;



/*<input type="text" list="cars" />
<datalist id="cars">
  <option>Volvo</option>
  <option>Saab</option>
  <option>Mercedes</option>
  <option>Audi</option>
</datalist>

also need to add the delete button but only if its in edit?
*/