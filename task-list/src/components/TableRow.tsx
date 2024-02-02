import { useContext } from "react";
import Task from "../data/dataInterfaces";
import DeleteButton from "./DeleteButton";
import LabelComponent from "./Label";
import Priority from "./Priority";
import { MyContext } from "./MyContext";
import { pages } from "../data/pages";

function TableRow({ task }: { task: Task }){
  //need to pass down the page state changing function
  const { setTasks, currentPage, setCurrentPage, setDetailID } = useContext(MyContext);

  function changeToDetail(taskID: number): void{
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
          <LabelComponent label={label} key={label.id}></LabelComponent>
        )
      })}</td>
      <td>
        <div className="buttons">
          <DeleteButton taskID={task.id}></DeleteButton>
          <button>
            <img src="create.svg" alt="edit" style={{width: 20, height: 20}}/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TableRow;
