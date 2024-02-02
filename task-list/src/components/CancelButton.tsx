import { MouseEvent, ReactComponentElement, useContext } from "react";
import { MyContext } from "./MyContext";
import { pages } from "../data/pages";

function CancelButton({ label }: { label: string}){
  const { setCurrentPage } = useContext(MyContext);

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setCurrentPage(pages.table);
  }
  return <button onClick={handleClick} className="cancelButton">{label}</button>;
}

export default CancelButton;