import Task from "../data/dataInterfaces";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table({ tasks, changeToDetail } : { tasks: Array<Task>, changeToDetail: (taskID: number) => void}){
  return (
    <table>
      <thead>
        <TableHeader></TableHeader>
      </thead>
      <tbody>
        {tasks.map(task => {
          return (
            <TableRow task={task} key={task.id} changeToDetail={changeToDetail}></TableRow>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;