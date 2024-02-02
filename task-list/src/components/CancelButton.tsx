import { MouseEvent, useContext } from "react";
import { MyContext } from "./MyContext";
import { pages } from "../data/pages";

function CancelButton(){
  const { setCurrentPage } = useContext(MyContext);

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setCurrentPage(pages.table);
  }
  return <button onClick={handleClick} className="cancelButton">Cancel</button>;
}

export default CancelButton;