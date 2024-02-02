
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import { useState } from "react";
import Task from "../data/dataInterfaces";
import Table from "./Table";
import Detail from "./Detail";

function Body({ tasks }: { tasks: Array<Task>}){
  const pages = { //using properties to set the strings instead of just writing strings will prevent typing errors
    table: "table",
    detail: "detail",
    edit: "edit"
  };

  const [currentPage, setCurrentPage] = useState(pages.table);

  function changeToDetail(taskID: number): void {

    setCurrentPage(pages.detail);
  }

  //Display correct page depending on what the state is
  return (
    <>
      {currentPage === pages.table && <Table tasks={tasks} changeToDetail={changeToDetail}></Table>}
      {currentPage === pages.detail && <Detail></Detail>}
    </>

  )
}

export default Body;