import { ReactElement, useContext } from "react";
import Task from "../data/dataInterfaces";
import { MyContext } from "./MyContext";
import DeleteButton from "./DeleteButton";

function Edit(){
  //ok SO
  //first, i need to grab the detail number
  //then i need to either get the corresponding task, or if its null, dont prefill fields

  //maybe i should have a state specifically for the form. if they save it all, it gets put in
  //need to get all the tasks and find the unique labels to offer as dropdown? dropdown/autofill. idk how to do that

  const { tasks, setTasks, detailID } = useContext(MyContext);

  const editMode = detailID !== null ? true : false;

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
        <input type="text" className="nextLine" id="title"/>
      </div>
     
      <div className="fullWidth">
        <label htmlFor="desc">Description</label>
        <input type="text" className="nextLine" id="desc"/>
      </div>

      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input type="datetime-local" id="dueDate"/>
      </div>
    
      <div>
        <label htmlFor="priority">Priority</label>
        <select id="priority">
          <option value="1">Very Low</option>
          <option value="2">Low</option>
          <option value="3">Medium</option>
          <option value="4">High</option>
          <option value="5">Very High</option>
        </select>
      </div>

      <div>
        <label>Label</label>
        <input type="text" list="labels"></input>
        <datalist id="labels">
          {getUniqueLabels(tasks).map(label => <option key={label}>{label}</option> )}
        </datalist>
      </div>

      <div>
        <label htmlFor="completed">Completed</label>
        <input type="checkbox" id="completed"/>
      </div>
      <div id="formButtons">
      {editMode && <DeleteButton taskID={detailID}></DeleteButton>}
      {editMode && <button>cancel</button>}
      {editMode && <button>save</button>}
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