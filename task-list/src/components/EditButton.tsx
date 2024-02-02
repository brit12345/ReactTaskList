import { MouseEvent, useContext } from "react";
import { MyContext } from "./MyContext";
import { pages } from "../data/pages";

function EditButton({ taskID } : { taskID: string }){
  const { setCurrentPage, setDetailID } = useContext(MyContext);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); //Prevents table row from registering being clicked
    setCurrentPage(pages.edit);
    setDetailID(taskID);
  }
  return (
    <button onClick={onClick}>
      <img src="create.svg" alt="edit" style={{width: 20, height: 20}}/>
    </button>
  )
}

export default EditButton;