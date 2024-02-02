import { useContext } from "react";
import { MyContext } from "./MyContext";
import { pages } from "../data/pages";


function AddButton(){
  const { setCurrentPage, setDetailID } = useContext(MyContext);
  function onClick(): void {
    setCurrentPage(pages.edit);
    setDetailID(null);
  }

  return (
    <button onClick={onClick}>
      <img src="add-circle.svg" alt="add task" style={{width: 20, height: 20}}/>
    </button>
  )
}

export default AddButton;