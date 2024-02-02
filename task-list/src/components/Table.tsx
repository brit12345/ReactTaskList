import { useContext } from "react";
import Task from "../data/dataInterfaces";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { MyContext } from "./MyContext";

function Table(){
  const { tasks, setTasks } = useContext(MyContext);
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