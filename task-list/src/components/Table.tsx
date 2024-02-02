import Task from "../data/dataInterfaces";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ tasks } : { tasks: Array<Task>}){
  return (
    <table>
      <thead>
        <TableHeader></TableHeader>
      </thead>
      <tbody>
        {tasks.map(task => {
          return (
            <TableRow task={task} key={task.id}></TableRow>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;