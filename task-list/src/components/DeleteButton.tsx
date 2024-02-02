import { MouseEvent, useContext } from "react";
import { MyContext } from "./MyContext";

function DeleteButton( { taskID } : {taskID: number }){
  const { tasks, setTasks } = useContext(MyContext);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    let excluded = tasks.filter(task => {
      if(task.id !== taskID){ //only keep the tasks that don't match the deletion ID
        return task;
      }
    });
    e.stopPropagation(); //Prevents table row from registering being clicked
    setTasks(excluded);
  }

  return (
    <button onClick={onClick}>
      <img src="trash.svg" alt="delete" style={{width: 20, height: 20}}/>
    </button>
  );
}

export default DeleteButton;