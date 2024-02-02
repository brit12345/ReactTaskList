
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import Task from "../data/dataInterfaces";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Body({ tasks }: { tasks: Array<Task>}){
  

  //ok im thinking that i do the whole table here and then split it up. mostly because i cant remember how tables work
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
  )
}

export default Body;