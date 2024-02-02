import { Dispatch, MouseEvent, SetStateAction, useContext } from "react";
import { MyContext } from "../MyContext";
import { pages } from "../../data/pages";
import Task from "../../data/dataInterfaces";

function DeleteButton( { taskID, alteredTasks, setAlteredTasks } : {taskID: string | null, alteredTasks: Array<Task> | null, setAlteredTasks: Dispatch<SetStateAction<Task[]>> | null }){
  const { tasks, setTasks, setCurrentPage } = useContext(MyContext);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    let excluded = tasks.filter(task => {
      if(task.id !== taskID){ //only keep the tasks that don't match the deletion ID
        return task;
      }
    });
    e.stopPropagation(); //Prevents table row from registering being clicked
    setTasks(excluded);
    setCurrentPage(pages.table);

    //repeating for altered makes sure the page updates, and lets users delete without changing their filters
    if(setAlteredTasks !== null && alteredTasks !== null){
      alteredTasks.filter(task => {
        if(task.id !== taskID){ //only keep the tasks that don't match the deletion ID
          return task;
        }
      });
      setAlteredTasks(excluded);
    }
  }

  return (
    <button onClick={onClick}>
      <img src="trash.svg" alt="delete" style={{width: 20, height: 20}}/>
    </button>
  );
}

export default DeleteButton;