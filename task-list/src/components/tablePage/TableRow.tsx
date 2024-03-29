import { Dispatch, SetStateAction, useContext } from "react";
import Task from "../../data/dataInterfaces";
import DeleteButton from "../buttons/DeleteButton";
import LabelComponent from "../Label";
import Priority from "./Priority";
import { MyContext } from "../MyContext";
import { pages } from "../../data/pages";
import EditButton from "../buttons/EditButton";

function TableRow({ task, alteredTasks, setAlteredTasks }: { task: Task, alteredTasks: Array<Task>, setAlteredTasks: Dispatch<SetStateAction<Task[]>> }){
  //need to pass down the page state changing function
  const { setTasks, currentPage, setCurrentPage, setDetailID } = useContext(MyContext);

  function changeToDetail(taskID: string): void{
    setDetailID(taskID);
    setCurrentPage(pages.detail);
  }
  //MOVE THE BUTTONS TO THIER OWN COMPONENTS BC REUISNG LATER
  return (
    <tr onClick={() => changeToDetail(task.id)}>
      <td>
        {task.completed && <img src="checkmark-circle-outline.svg" alt="completed" style={{width: 20, height: 20}}/>}
      </td>
      <td>{task.title}</td>
      <td><div className="desc">{task.desc}</div></td>
      <td>{(new Date(task.dueDate)).toLocaleString('en-AU', {hour12: true, dateStyle: "short", timeStyle: "short"})}</td>
      <Priority priority={task.priority}></Priority>
      <td className="labelContainer">{task.labels.map(label => {
        return (
          <LabelComponent label={label} key={label.id} editMode={false} onClick={undefined}></LabelComponent>
        )
      })}</td>
      <td>
        <div className="buttons">
          <DeleteButton taskID={task.id} alteredTasks={alteredTasks} setAlteredTasks={setAlteredTasks}></DeleteButton>
          <EditButton taskID={task.id}></EditButton>
        </div>
      </td>
    </tr>
  )
}

export default TableRow;
