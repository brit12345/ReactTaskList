import Task from "../data/dataInterfaces";
import LabelComponent from "./Label";
import Priority from "./Priority";

function TableRow({ task }: { task: Task}){
  return (
    <tr>
      <td>
        {task.completed && <img src="checkmark-circle-outline.svg" style={{width: 20, height: 20}}/>}
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
        <button>
          Delete
        </button>
        <button>
          Edit
        </button>
      </td>
    </tr>
  )
}

export default TableRow;